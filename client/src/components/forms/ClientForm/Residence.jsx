import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const Residence = ({ handleInputChange, clientData }) => {
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
                Residence
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField
                        hiddenLabel
                        value={clientData.residence?.number}
                        placeholder='#'
                        variant='filled'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('residence', e.target.value, 'number')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        hiddenLabel
                        value={clientData?.residence?.street}
                        placeholder='Street'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'street')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        hiddenLabel
                        value={clientData?.residence?.zip}
                        placeholder='ZIP'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'zip')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        hiddenLabel
                        value={clientData?.residence?.city}
                        placeholder='City'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'city')}
                    />
                </Grid>
            </Grid>
            <Box sx={{ height: '1rem' }} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        hiddenLabel
                        value={clientData?.residence?.province}
                        placeholder='Province'
                        variant='filled'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('residence', e.target.value, 'province')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        hiddenLabel
                        value={clientData?.residence?.country}
                        placeholder='Country'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'country')}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Residence;
