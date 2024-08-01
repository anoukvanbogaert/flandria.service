import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const ICE = ({ handleInputChange, clientData }) => {
    console.log('clientData', clientData);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label='Emergency Contact 1 - Name'
                        value={clientData?.emergencyContact1?.name || ''}
                        placeholder='Full Name'
                        variant='outlined'
                        fullWidth
                        size='small'
                        onChange={(e) =>
                            handleInputChange('emergencyContact1', e.target.value, 'name')
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Emergency Contact 1 - Cell'
                        value={clientData?.emergencyContact1?.cellphone || ''}
                        placeholder='Cellphone'
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={(e) =>
                            handleInputChange('emergencyContact1', e.target.value, 'cellphone')
                        }
                    />
                </Grid>
            </Grid>
            <Box sx={{ height: '1rem' }} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label='Emergency Contact 2 - Name'
                        value={clientData?.emergencyContact2?.name || ''}
                        placeholder='Full Name'
                        variant='outlined'
                        fullWidth
                        size='small'
                        onChange={(e) =>
                            handleInputChange('emergencyContact2', e.target.value, 'name')
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Emergency Contact 2 - Cell'
                        value={clientData?.emergencyContact2?.cellphone || ''}
                        placeholder='Cellphone'
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={(e) =>
                            handleInputChange('emergencyContact2', e.target.value, 'cellphone')
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ICE;
