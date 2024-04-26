import { React, useState, useEffect } from 'react';
import './form.scss';
import classNames from 'classnames';
import { Button, Grid, CircularProgress, Backdrop, Box, Typography } from '@mui/material';

import { Check, Close, Replay } from '@mui/icons-material';
import { addToCollection } from '../utils/getData';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import CustomAnimatedButton from './CustomAnimatedButton';

import ClientForm from './forms/ClientForm';
import BoatForm from './forms/BoatForm';
import ServiceForm from './forms/ServiceForm';

const AdminAddClient = ({ open }) => {
    const [operationStatus, setOperationStatus] = useState('idle');
    const [userBoats, setUserboats] = useState([]);
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        boat: [],
    });

    const [boatData, setBoatData] = useState({
        client: '',
        name: '',
        brand: '',
        model: '',
        remark: '',
    });

    const [serviceData, setServiceData] = useState({
        services: [],
        date: null,
        client: '',
        boat: '',
        brand: '',
        model: '',
        remark: '',
    });
    const { boats, clients } = useStoreState(AppStore);

    useEffect(() => {
        if (clientData.client || serviceData.client) {
            const clientId = clientData.client || serviceData.client;
            const client = clients.find((c) => c.uid === clientId);

            if (client && client.boats) {
                const userBoats = boats.filter((boat) => client.boats.includes(boat.id));
                setUserboats(userBoats);
            } else {
                setUserboats([]);
            }
        }
    }, [clientData.client, clients, boats]);

    const handleClientInputChange = (field, value) => {
        setClientData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBoatInputChange = (field, value) => {
        setBoatData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleServiceInputChange = (field, value) => {
        setServiceData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setOperationStatus('idle');
        if (selection === 'client') {
            try {
                await addToCollection('clients', clientData);
                setOperationStatus('success');
            } catch (error) {
                console.error('Error saving document: ', error);
                setOperationStatus('error');
                setTimeout(() => {
                    setOperationStatus('idle');
                }, 2000);
            } finally {
                setLoading(false);
            }
        } else if (selection === 'boat') {
            try {
                await addToCollection('boats', boatData);
                setOperationStatus('success');
            } catch (error) {
                console.error('Error saving document: ', error);
                setOperationStatus('error');
                setTimeout(() => {
                    setOperationStatus('idle');
                }, 2000);
            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        if (operationStatus === 'success') {
            setTimeout(() => {
                setStep(1);
                resetForm();
            }, 2000);
        }
    }, [operationStatus]);

    const formClass = classNames('admin__form', {
        'admin__form--open': open,
        'admin__form--close': !open,
    });
    const resetForm = () => {
        setClientData({
            name: null,
            email: null,
            boat: [],
        });
        setBoatData({
            client: null,
            name: null,
            brand: null,
            model: '',
            remark: null,
        });
        setOperationStatus('idle');
    };
    const renderForm = () => {
        if (selection === 'client') {
            return (
                <ClientForm
                    handleClientInputChange={handleClientInputChange}
                    clientData={clientData}
                />
            );
        } else if (selection === 'boat') {
            return <BoatForm handleBoatInputChange={handleBoatInputChange} boatData={boatData} />;
        } else if (selection === 'service') {
            return (
                <ServiceForm
                    handleServiceInputChange={handleServiceInputChange}
                    serviceData={serviceData}
                    userBoats={userBoats}
                />
            );
        }
    };

    return (
        <Box className='form__background' sx={{ position: 'relative' }}>
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
            <Box
                className={formClass}
                sx={{
                    margin: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
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
                        <>{renderForm()}</>
                    )}
                    <Grid item xs={12}>
                        {step === 2 && (
                            <>
                                <Button
                                    onClick={() => setStep(1)}
                                    startIcon={<Replay />}
                                    sx={{
                                        color: 'grey',
                                        marginLeft: 'auto',
                                        fontSize: '1rem',
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={loading || operationStatus !== 'idle'}
                                    variant='contained'
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        width: 'auto',
                                    }}
                                    color='primary'
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminAddClient;
