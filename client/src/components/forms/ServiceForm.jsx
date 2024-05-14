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
    const { clients, boats, serviceTemplates } = useStoreState(AppStore);
    const { serviceData } = useStoreState(FormStore);
    const [userBoats, setUserboats] = useState([]);

    const filteredServiceTemplates = serviceTemplates.filter((template) => template.description);
    console.log('clients', userBoats);

    useEffect(() => {
        if (serviceData.client) {
            const clientId = serviceData.client;
            const client = clients.find((c) => c.id === clientId);

            if (client) {
                const boatInfo = client.boat
                    .map((boatId) => boats.find((boat) => boat.id === boatId))
                    .filter((boat) => boat !== undefined);
                setUserboats(boatInfo);
            } else {
                setUserboats([]);
            }
        }
    }, [serviceData.client, clients]);

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
                        getOptionLabel={(option) => option.label || ''}
                        onChange={(event, newValue) => {
                            const id = newValue ? newValue.uid : '';
                            handleInputChange('client', id);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Choose a client'
                                fullWidth
                                value={serviceData.client}
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
                            value={serviceData.boat}
                            onChange={(event) => handleInputChange('boat', event.target.value)}
                            label='Select vessel'
                        >
                            {userBoats.map((boat) => (
                                <MenuItem key={boat.id} value={boat.id}>
                                    {`${boat.name} (${boat.brand}, ${boat.model})`}
                                </MenuItem>
                            ))}
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
                            value={serviceData.services}
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
