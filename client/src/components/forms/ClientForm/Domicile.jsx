import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const Domicile = ({ handleInputChange, clientData }) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField
                        label='#'
                        value={clientData?.domicile?.number || ''}
                        placeholder='#'
                        variant='outlined'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'number')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label='Street'
                        value={clientData?.domicile?.street || ''}
                        placeholder='Street'
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'street')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='ZIP'
                        value={clientData?.domicile?.zip || ''}
                        placeholder='ZIP'
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'zip')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='City'
                        value={clientData?.domicile?.city}
                        placeholder='City'
                        variant='outlined'
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
                        label='Province'
                        value={clientData?.domicile?.province || ''}
                        placeholder='Province'
                        variant='outlined'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('domicile', e.target.value, 'province')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Country'
                        value={clientData?.domicile?.country || ''}
                        placeholder='Country'
                        variant='outlined'
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
