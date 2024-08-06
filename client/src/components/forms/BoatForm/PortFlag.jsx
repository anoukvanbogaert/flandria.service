import React from 'react';
import { TextField, Grid } from '@mui/material';

const PortFlag = ({ handleInputChange, boatData }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label='Port'
                    value={boatData?.port || ''}
                    placeholder='e.g. Denia'
                    variant='outlined'
                    fullWidth
                    size='small'
                    onChange={(e) => handleInputChange('port', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Flag'
                    value={boatData?.flag || ''}
                    placeholder='e.g. Malta'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => handleInputChange('flag', e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default PortFlag;
