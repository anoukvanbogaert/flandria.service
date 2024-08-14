import React from 'react';
import { Grid, Box } from '@mui/material';
import CustomAnimatedButton from './../CustomAnimatedButton';

const AdminOptions = ({ setSelection }) => {
    return (
        <Box
            className='admin__form'
            sx={{
                margin: 'auto',
                borderRadius: 2,

                backgroundColor: 'white',
            }}
        >
            <Grid container alignItems='center' spacing={3}>
                <CustomAnimatedButton setSelection={setSelection} />
            </Grid>
        </Box>
    );
};

export default AdminOptions;
