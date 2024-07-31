import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

const Residence = ({ handleInputChange, clientData }) => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <TextField
                        label='Number'
                        value={clientData.residence.number}
                        placeholder='Email'
                        variant='filled'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('residence', e.target.value, 'number')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label='Street'
                        value={clientData?.residence?.street}
                        placeholder='Email'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'street')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='ZIP'
                        value={clientData?.residence?.zip}
                        placeholder='Email'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'zip')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='City'
                        value={clientData?.residence?.city}
                        placeholder='Email'
                        variant='filled'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'city')}
                    />
                </Grid>
            </Grid>
            <Box sx={{ height: '1.5rem' }} />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        label='Province'
                        value={clientData?.residence?.province}
                        placeholder='Email'
                        variant='filled'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('residence', e.target.value, 'province')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Country'
                        value={clientData?.residence?.country}
                        placeholder='Email'
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
