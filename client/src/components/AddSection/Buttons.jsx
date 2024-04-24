import React from 'react';
import { Grid, Button } from '@mui/material';
import { Replay } from '@mui/icons-material';

const Buttons = ({ step, setStep, handleSave, loading, operationStatus }) => {
    return (
        <Grid item xs={12}>
            {step === 2 && (
                <>
                    <Button
                        onClick={() => setStep(1)}
                        startIcon={<Replay />}
                        sx={{ color: 'grey', marginLeft: 'auto', fontSize: '1rem' }}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading || operationStatus !== 'idle'}
                        variant='contained'
                        sx={{ fontSize: '0.875rem', fontWeight: 'bold', width: 'auto' }}
                        color='primary'
                    >
                        Save
                    </Button>
                </>
            )}
        </Grid>
    );
};

export default Buttons;
