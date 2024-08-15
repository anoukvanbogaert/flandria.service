import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CustomLoader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30vh',
            }}
        >
            <CircularProgress size={80} sx={{ color: 'tertiary.main' }} />
        </Box>
    );
};

export default CustomLoader;
