import React from 'react';
import './form.scss';
import { Box, Grid, Typography } from '@mui/material';
import BackdropComponent from './BackdropComponent';
import ClientForm from './ClientForm';
import BoatForm from './BoatForm';
import ServiceForm from './ServiceForm';
import CustomAnimatedButton from './CustomAnimatedButton';
import useAdminAddClient from '../../hooks/useAdminAddClient';
import Buttons from './Buttons';

export default function AddOptions({ open }) {
    const {
        step,
        setStep,
        selection,
        setSelection,
        loading,
        operationStatus,
        formClass,
        handleSave,
    } = useAdminAddClient();

    // useEffect(() => {
    //     if (operationStatus === 'success') {
    //         setTimeout(() => {
    //             setStep(1);
    //             resetForm();
    //         }, 2000);
    //     }
    // }, [operationStatus, setStep, resetForm]);

    const renderForm = () => {
        switch (selection) {
            case 'client':
                return <ClientForm />;
            case 'boat':
                return <BoatForm />;
            case 'service':
                return <ServiceForm />;
            default:
                return null;
        }
    };

    return (
        <Box className='form__background' sx={{ position: 'relative' }}>
            <BackdropComponent loading={loading} operationStatus={operationStatus} />
            <Box
                className={formClass}
                sx={{ margin: 'auto', borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}
            >
                <Grid container alignItems='center' spacing={3} padding='1.5rem'>
                    <Grid item xs={12} sx={{ padding: '1.5rem 0 0 0' }}>
                        <Typography variant='h1' component='h2' sx={{ marginBottom: 2 }}>
                            {step === 1 ? 'Choose an option' : 'Fill in the details'}
                        </Typography>
                    </Grid>
                    {step === 1 ? (
                        <CustomAnimatedButton setStep={setStep} setSelection={setSelection} />
                    ) : (
                        renderForm()
                    )}
                    <Buttons
                        step={step}
                        setStep={setStep}
                        handleSave={handleSave}
                        loading={loading}
                        operationStatus={operationStatus}
                    />
                </Grid>
            </Box>
        </Box>
    );
}
