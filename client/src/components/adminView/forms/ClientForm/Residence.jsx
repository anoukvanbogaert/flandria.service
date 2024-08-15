import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

const Residence = ({ handleInputChange, clientData }) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField
                        label='#'
                        value={clientData.residence?.number || ''}
                        placeholder='#'
                        variant='outlined'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('residence', e.target.value, 'number')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label='Street'
                        value={clientData?.residence?.street || ''}
                        placeholder='Street'
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'street')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='ZIP'
                        value={clientData?.residence?.zip || ''}
                        placeholder='ZIP'
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={(e) => handleInputChange('residence', e.target.value, 'zip')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='City'
                        value={clientData?.residence?.city}
                        placeholder='City'
                        variant='outlined'
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
                        label='Province'
                        value={clientData?.residence?.province || ''}
                        placeholder='Province'
                        variant='outlined'
                        fullWidth
                        size='small'
                        onChange={(e) => handleInputChange('residence', e.target.value, 'province')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Country'
                        value={clientData?.residence?.country || ''}
                        placeholder='Country'
                        variant='outlined'
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
