import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const Identity = ({ handleInputChange, clientData }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label='IDº'
                    value={clientData?.idNumber || ''}
                    placeholder='ID Number'
                    variant='outlined'
                    fullWidth
                    size='small'
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='NIEº'
                    value={clientData?.emergencyContact1?.cellphone || ''}
                    placeholder='NIE Number'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => handleInputChange('nieNumber', e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default Identity;
