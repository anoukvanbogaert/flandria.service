import { React, useEffect, useState } from 'react';
import {
    Autocomplete,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Dialog,
    Chip,
} from '@mui/material';

import { AccountCircle, DirectionsBoat, Build, Comment, DateRange, Add } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useStoreState } from 'pullstate';
import ServiceTemplateForm from './ServiceTemplateForm';
import { AppStore } from '../../../stores/AppStore';
import { FormStore } from '../../../stores/FormStore';
import { getBoatNameById } from '../../../utils/getData';

const ServiceForm = ({ handleInputChange }) => {
    const { clients, boats, services, serviceTemplates } = useStoreState(AppStore);
    const { editId, serviceData } = useStoreState(FormStore);
    const [userBoats, setUserboats] = useState([]);
    const [clientValue, setClientValue] = useState(null);
    // const [boatValue, setBoatValue] = useState(null);
    const [openAddService, setOpenAddService] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleServiceChange = (event) => {
        const newValue = event.target.value;
        const filteredValue = newValue.filter((item) => item !== 'add_new_service');
        handleInputChange('services', filteredValue);
    };

    const filteredServiceTemplates = serviceTemplates.filter((template) => template.description);

    useEffect(() => {
        if (clientValue) {
            const clientId = clientValue.uid;
            const client = clients.find((c) => c.uid === clientId);

            if (client) {
                const boatInfo = client.boat
                    .map((boatId) => boats.find((boat) => boat.id === boatId))
                    .filter((boat) => boat !== undefined);

                setUserboats(boatInfo);
            } else {
                setUserboats([]);
            }
        }
    }, [serviceData?.client, clients, boats, clientValue]);

    useEffect(() => {
        if (editId) {
            const editData = services.find((service) => service.id === editId) || serviceData;
            const clientObject = clients.find((client) => client.uid === editData.client);

            const clientValue = clientObject
                ? { label: clientObject.name, uid: clientObject.uid }
                : null;
            setClientValue(clientValue);

            // const boatInfo = boats.find((boat) => boat.id === editData.boat) || 'Unknown';
            // setBoatValue(boatInfo);
            FormStore.update((s) => {
                s.serviceData = editData || {};
            });
            setLoading(false);
        }
    }, [editId, services, clients, serviceData]);

    useEffect(() => {
        if (!editId) {
            setLoading(false);
            FormStore.update((s) => {
                s.serviceData = { services: [], date: null, client: '', boat: [], remark: '' };
            });
        }
    }, [editId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Grid
                container
                spacing={3}
                alignItems='center'
                justifyContent='space-between'
                sx={{ marginLeft: 0, width: 'auto' }}
            >
                <Grid item xs={1}>
                    <AccountCircle color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <Autocomplete
                        freeSolo={false}
                        disabled={serviceData.id ? true : false}
                        options={clients.map((option) => ({
                            label: option.name,
                            uid: option.uid,
                        }))}
                        value={clientValue}
                        isOptionEqualToValue={(option, value) => option.uid === value.uid}
                        onChange={(event, newValue) => {
                            setClientValue(newValue);
                            handleInputChange('client', newValue ? newValue.uid : '');
                        }}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                disabled={serviceData.id ? true : false}
                                label='Client'
                                fullWidth
                                variant='outlined'
                                size='small'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={1}>
                    <DirectionsBoat color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth variant='outlined' size='small'>
                        <InputLabel id='service-select-label'>Select vessel</InputLabel>
                        <Select
                            labelId='service-select-label'
                            value={serviceData.boat[0] || ''}
                            onChange={(event) => handleInputChange('boat', event.target.value)}
                            label='Select vessel'
                            disabled={serviceData?.id ? true : false}
                        >
                            {/* editing mode */}
                            {serviceData.id ? (
                                <MenuItem value={serviceData.boat[0]}>
                                    {getBoatNameById(serviceData.boat[0], boats)}
                                </MenuItem>
                            ) : // user has boats
                            userBoats.length > 0 ? (
                                userBoats.map((boat) => (
                                    <MenuItem key={boat.id} value={boat.id}>
                                        {`${boat.boatName} (${boat.brand}, ${boat.model})`}
                                    </MenuItem>
                                ))
                            ) : (
                                // user doesn't have boats
                                <MenuItem disabled={true} value=''>
                                    {serviceData.client
                                        ? 'This customer does not have any boats yet'
                                        : 'Please select a customer first'}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <Build color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth variant='outlined' size='small' sx={{ padding: 0 }}>
                        <InputLabel id='service-select-label'>Select service</InputLabel>
                        <Select
                            labelId='service-select-label'
                            multiple
                            value={serviceData.services || ''}
                            onChange={handleServiceChange}
                            label='Select service'
                            renderValue={(selected) => (
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            style={{
                                                backgroundColor: '#045174',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                marginRight: '0.5rem',
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            <MenuItem
                                sx={{
                                    fontWeight: 'bold',
                                    background: '#ceeefd',
                                    color: '#045174',
                                    padding: '0 1rem',
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOpenAddService(true);
                                }}
                                value='add_new_service'
                            >
                                <Add fontSize='small' sx={{ marginRight: '0.5rem' }} /> Add a
                                service
                            </MenuItem>
                            <Divider sx={{ m: '0 !important' }} />
                            {filteredServiceTemplates.map((template) => (
                                <MenuItem
                                    key={template.id}
                                    value={template.description}
                                    sx={{ padding: '0 1rem' }}
                                >
                                    {template.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={1}>
                    <DateRange color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label='Select date'
                            value={
                                serviceData?.date?.seconds
                                    ? new Date(serviceData.date.seconds * 1000)
                                    : null
                            }
                            onChange={(newValue) => handleInputChange('date', newValue)}
                            slotProps={{ textField: { size: 'small', variant: 'outlined' } }}
                            components={{
                                OpenPickerIcon: TextField,
                            }}
                            componentsProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'outlined',
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={1}>
                    <Comment color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Remark'
                        multiline
                        rows={4}
                        value={serviceData.remark || ''}
                        placeholder='Enter your remark here'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => handleInputChange('remark', event.target.value)}
                    />
                </Grid>
            </Grid>
            <Dialog open={openAddService}>
                <ServiceTemplateForm setOpenAddService={setOpenAddService} />
            </Dialog>
        </>
    );
};

export default ServiceForm;
