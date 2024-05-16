import { React, useEffect, useState } from 'react';
import {
    Autocomplete,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import { AccountCircle, DirectionsBoat, Build, Comment, DateRange } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import { FormStore } from '../../stores/FormStore';

const ServiceForm = ({ handleInputChange }) => {
    const { clients, boats, services, serviceTemplates } = useStoreState(AppStore);
    const { editId, serviceData } = useStoreState(FormStore);
    const [userBoats, setUserboats] = useState([]);
    const [clientValue, setClientValue] = useState(null);
    const [boatValue, setBoatValue] = useState(null);

    const filteredServiceTemplates = serviceTemplates.filter((template) => template.description);

    useEffect(() => {
        if (serviceData.client) {
            const clientId = serviceData.client;
            const client = clients.find((c) => c.id === clientId);

            if (client) {
                console.log('client', client);
                const boatInfo = client.boat
                    .map((boatId) => boats.find((boat) => boat.id === boatId))
                    .filter((boat) => boat !== undefined);
                setUserboats(boatInfo);
            } else {
                setUserboats([]);
            }
        }
    }, [serviceData.client, clients, boats]);

    useEffect(() => {
        if (editId) {
            const editData = services.find((service) => service.id === editId) || serviceData;
            const clientName =
                clients.find((client) => client.id === editData.client)?.name || 'Unknown';
            setClientValue(clientName);
            const boatInfo = boats.find((boat) => boat.id === editData.boat) || 'Unknown';
            setBoatValue(boatInfo);
            FormStore.update((s) => {
                s.serviceData = editData || {};
            });
        }
    }, [editId, services]);

    useEffect(() => {
        if (!editId) {
            FormStore.update((s) => {
                s.serviceData = { services: [], date: null, client: '', boat: [], remark: '' };
            });
        }
    }, [editId]);

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
                        freeSolo
                        options={clients.map((option) => ({
                            label: option.name,
                            uid: option.id,
                        }))}
                        value={clientValue}
                        onChange={(event, newValue) => {
                            setClientValue(newValue);
                            handleInputChange('client', newValue ? newValue.uid : '');
                        }}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                disabled={serviceData.id}
                                label={serviceData.id ? 'Client' : 'Choose a client'}
                                fullWidth
                                variant='filled'
                                size='small'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={1}>
                    <DirectionsBoat color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth variant='filled' size='small'>
                        <InputLabel id='service-select-label'>Select vessel</InputLabel>
                        <Select
                            labelId='service-select-label'
                            value={serviceData.boat || []}
                            onChange={(event) => handleInputChange('boat', event.target.value)}
                            label='Select vessel'
                            disabled={serviceData.id}
                        >
                            {userBoats.length > 0 ? (
                                userBoats.map((boat) => (
                                    <MenuItem key={boat.id} value={boat.id}>
                                        {`${boat.name} (${boat.brand}, ${boat.model})`}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled value=''>
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
                    <FormControl fullWidth variant='filled' size='small'>
                        <InputLabel id='service-select-label'>Select service</InputLabel>
                        <Select
                            labelId='service-select-label'
                            multiple
                            value={serviceData.services || ''}
                            onChange={(event) => handleInputChange('services', event.target.value)}
                            label='Select service'
                        >
                            {filteredServiceTemplates.map((template) => (
                                <MenuItem key={template.id} value={template.description}>
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
                            value={serviceData.date}
                            onChange={(newValue) => handleInputChange('date', newValue)}
                            slotProps={{ textField: { size: 'small', variant: 'filled' } }}
                            components={{
                                OpenPickerIcon: TextField,
                            }}
                            componentsProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'filled',
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
                        placeholder='Enter your remark here'
                        variant='filled'
                        fullWidth
                        onChange={(event) =>
                            handleInputChange('selectedRemark', event.target.value)
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ServiceForm;
