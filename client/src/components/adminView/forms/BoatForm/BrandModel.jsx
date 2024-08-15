import React from 'react';
import { TextField, Grid } from '@mui/material';

const BrandModel = ({ handleInputChange, boatData }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label='Brand'
                    value={boatData?.brand || ''}
                    placeholder='e.g. Sunseeker'
                    variant='outlined'
                    fullWidth
                    size='small'
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Model'
                    value={boatData?.model || ''}
                    placeholder='e.g. Manhattan'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => handleInputChange('model', e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default BrandModel;
