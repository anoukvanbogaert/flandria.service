import React from 'react';
import {
    Grid,
    TextField,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { AccountCircle, DirectionsBoat, Build, DateRange, Comment } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';

const ServiceForm = () => {
    const { clients, boats, serviceTemplates } = useStoreState(AppStore);

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
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Choose a client'
                            fullWidth
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
                    <InputLabel id='boat-select-label'>Select vessel</InputLabel>
                    <Select labelId='boat-select-label' value={''} label='Select vessel'>
                        {boats.map((boat) => (
                            <MenuItem key={boat.id} value={boat.id}>
                                {`${boat.boatName} (${boat.brand}, ${boat.model})`}
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
                        value={[]}
                        label='Select service'
                    >
                        {serviceTemplates.map((template) => (
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
                        onChange={(newValue) => {}}
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
                />
            </Grid>
        </>
    );
};

export default ServiceForm;
