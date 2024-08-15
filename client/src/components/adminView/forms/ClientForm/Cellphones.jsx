import React from 'react';
import { TextField, Grid } from '@mui/material';

const Cellphones = ({ handleInputChange, clientData }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label='Cellphone 1'
                    value={clientData?.cellphone1 || ''}
                    placeholder='#'
                    variant='outlined'
                    fullWidth
                    size='small'
                    onChange={(e) => handleInputChange('cellphone1', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Cellphone 2'
                    value={clientData?.cellphone2 || ''}
                    placeholder='Street'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => handleInputChange('cellphone2', e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default Cellphones;
