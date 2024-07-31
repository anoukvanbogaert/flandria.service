import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const Domicile = ({ handleInputChange, clientData }) => {
    console.log('clientData', clientData);
    return (
        <>
            <Typography
                variant='subtitle1'
                sx={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#045174',
                }}
            >
                Domicile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField
                        hiddenLabel
                        value={clientData?.domicile?.number}
                        placeholder='#'
                        variant='filled'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'number')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        hiddenLabel
                        value={clientData?.domicile?.street}
                        placeholder='Street'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'street')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        hiddenLabel
                        value={clientData?.domicile?.zip}
                        placeholder='ZIP'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'zip')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        hiddenLabel
                        value={clientData?.domicile?.city}
                        placeholder='City'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'city')}
                    />
                </Grid>
            </Grid>
            <Box sx={{ height: '1rem' }} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        hiddenLabel
                        value={clientData?.domicile?.province}
                        placeholder='Province'
                        variant='filled'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'province')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        hiddenLabel
                        value={clientData?.domicile?.country}
                        placeholder='Country'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'country')}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Domicile;
