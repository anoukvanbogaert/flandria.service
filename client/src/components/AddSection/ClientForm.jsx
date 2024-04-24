import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Email, AccountCircle, DirectionsBoat } from '@mui/icons-material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';

const ClientForm = () => {
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
                />
            </Grid>
            <Grid item xs={1}>
                <DirectionsBoat />
            </Grid>
            <Grid item xs={11}>
                <FormControl fullWidth variant='filled' size='small'>
                    <InputLabel id='boat-select-label'>Select vessel</InputLabel>
                    <Select labelId='boat-select-label' value={''} label='Select vessel (if any)'>
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
