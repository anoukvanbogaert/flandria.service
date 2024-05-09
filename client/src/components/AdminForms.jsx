import React, { useState, useEffect } from 'react';
import './AddSection/form.scss';
import { Button, Grid, CircularProgress, Backdrop, Box, Typography, Modal } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { addToCollection } from '../utils/getData';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';

import ClientForm from './forms/ClientForm';
import BoatForm from './forms/BoatForm';
import ServiceForm from './forms/ServiceForm';

const AdminForms = ({ selection, setOpenModal }) => {
    const [operationStatus, setOperationStatus] = useState('idle');
    const [userBoats, setUserboats] = useState([]);
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
    }, [clientData.client, serviceData.client, clients, boats]);

    const handleInputChange = (dataSetter) => (field, value) => {
        dataSetter((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        setOperationStatus('idle');

        try {
            if (selection === 'client') {
                await addToCollection('clients', clientData);
            } else if (selection === 'boat') {
                await addToCollection('boats', boatData);
            } else if (selection === 'service') {
                await addToCollection('services', serviceData);
            }
            setOperationStatus('success');
        } catch (error) {
            console.error('Error saving document: ', error);
            setOperationStatus('error');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setOperationStatus('idle');
                setOpenModal(false);
            }, 2000);
        }
    };

    const renderForm = () => {
        switch (selection) {
            case 'client':
                return (
                    <ClientForm
                        handleInputChange={handleInputChange(setClientData)}
                        clientData={clientData}
                    />
                );
            case 'boat':
                return (
                    <BoatForm
                        handleInputChange={handleInputChange(setBoatData)}
                        boatData={boatData}
                    />
                );
            case 'service':
                return (
                    <ServiceForm
                        handleInputChange={handleInputChange(setServiceData)}
                        serviceData={serviceData}
                        userBoats={userBoats}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            open={true}
            onClose={() => setOpenModal(false)}
            aria-labelledby='modal-title'
            aria-describedby='modal-description'
        >
            <Box
                className='form__background'
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                }}
            >
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
                <Typography
                    id='modal-title'
                    variant='h2'
                    component='h2'
                    color='primary'
                    sx={{ marginBottom: '2rem' }}
                >
                    Fill in the details
                </Typography>
                <Box>{renderForm()}</Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        onClick={handleSave}
                        disabled={loading || operationStatus !== 'idle'}
                        variant='contained'
                        sx={{ mt: '2rem', fontWeight: 'bold', width: 'fit-content' }}
                        color='primary'
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AdminForms;
