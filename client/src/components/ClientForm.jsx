import React from 'react';
import { Email, AccountCircle, DirectionsBoat } from '@mui/icons-material';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';

const ClientForm = ({ handleClientInputChange, clientData }) => {
    const { boats } = useStoreState(AppStore);

    return (
        <>
            <Grid item xs={1}>
                <AccountCircle />
            </Grid>
            <Grid item xs={11} sx={{ paddingLeft: '40px' }}>
                <TextField
                    label='Add name'
                    placeholder='Add name'
                    variant='filled'
                    fullWidth
                    size='small'
                    onChange={(e) => handleClientInputChange('name', e.target.value)}
                />
            </Grid>
            <Grid item xs={1}>
                <Email />
            </Grid>
            <Grid item xs={11}>
                <TextField
                    label='Add email'
                    placeholder='Add email'
                    variant='filled'
                    fullWidth
                    size='small'
                    onChange={(e) => handleClientInputChange('email', e.target.value)}
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
                        value={clientData.boat}
                        onChange={(event) => handleClientInputChange('boat', event.target.value)}
                        label='Select vessel (if any)'
                    >
                        {boats.map((boat) => (
                            <MenuItem key={boat.id} value={boat.id}>
                                {`${boat.boatName} (${boat.brand}, ${boat.model})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

export default ClientForm;
