import React from 'react';
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

const ServiceForm = ({ handleServiceInputChange, serviceData, userBoats }) => {
    const { clients, serviceTemplates } = useStoreState(AppStore);
    const filteredServiceTemplates = serviceTemplates.filter((template) => template.description);
    return (
        <>
            <Grid item xs={1}>
                <AccountCircle />
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
                        handleServiceInputChange('client', id);
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
                <DirectionsBoat />
            </Grid>
            <Grid item xs={11}>
                <FormControl fullWidth variant='filled' size='small'>
                    <InputLabel id='service-select-label'>Select vessel</InputLabel>
                    <Select
                        labelId='service-select-label'
                        value={serviceData.boat}
                        onChange={(event) => handleServiceInputChange('boat', event.target.value)}
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
                <Build />
            </Grid>
            <Grid item xs={11}>
                <FormControl fullWidth variant='filled' size='small'>
                    <InputLabel id='service-select-label'>Select service</InputLabel>
                    <Select
                        labelId='service-select-label'
                        multiple
                        value={serviceData.services}
                        onChange={(event) =>
                            handleServiceInputChange('services', event.target.value)
                        }
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
                <DateRange />
            </Grid>
            <Grid item xs={11}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label='Select date'
                        value={serviceData.date}
                        onChange={(newValue) => handleServiceInputChange('date', newValue)}
                        slotProps={{ textField: { size: 'small', variant: 'filled' } }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={1}>
                <Comment />
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
                        handleServiceInputChange('selectedRemark', event.target.value)
                    }
                />
            </Grid>
        </>
    );
};

export default ServiceForm;
