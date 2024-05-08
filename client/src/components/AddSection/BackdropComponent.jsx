import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

const BackdropComponent = ({ loading, operationStatus }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                    operationStatus === 'success'
                        ? 'rgba(0, 255, 0, 0.3)'
                        : operationStatus === 'error'
                        ? 'rgba(255, 0, 0, 0.3)'
                        : 'transparent',
            }}
            open={loading || operationStatus !== 'idle'}
        >
            {loading ? (
                <CircularProgress color='inherit' size={68} />
            ) : operationStatus === 'success' ? (
                <Check sx={{ fontSize: 68, color: 'green' }} />
            ) : operationStatus === 'error' ? (
                <Close sx={{ fontSize: 68, color: 'red' }} />
            ) : null}
        </Backdrop>
    );
};

export default BackdropComponent;
