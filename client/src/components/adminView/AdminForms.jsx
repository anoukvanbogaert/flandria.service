import React, { useState, useEffect } from 'react';
import './forms/form.scss';
import { Button, CircularProgress, Backdrop, Box, Typography, Modal } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { addToCollection, editInCollection } from '../../utils/getData';
import { useStoreState } from 'pullstate';

import ClientForm from './forms/ClientForm/ClientForm';
import BoatForm from './forms/BoatForm/BoatForm';
import ServiceForm from './forms/ServiceForm';
import { FormStore } from '../../stores/FormStore';
import CustomTooltip from './CustomTooltip';

const AdminForms = ({ selection, setOpenModal }) => {
    const [operationStatus, setOperationStatus] = useState('idle');
    const [loading, setLoading] = useState(false);
    const [disableSave, setDisableSave] = useState(true);
    const { boatData, serviceData, clientData } = useStoreState(FormStore);

    useEffect(() => {
        const checkDisableSave = () => {
            if (selection === 'boat') {
                return !(boatData.client && boatData.boatName);
            } else if (selection === 'client') {
                return !(clientData.name && clientData.email);
            } else if (selection === 'service') {
                return !(
                    serviceData?.boat?.length > 0 &&
                    serviceData.client &&
                    serviceData.services.length > 0
                );
            }
            return true;
        };

        setDisableSave(checkDisableSave());
    }, [boatData, clientData, serviceData, selection]);

    const handleInputChange = (section) => (field, value, subField) => {
        FormStore.update((s) => {
            if (!s[section]) {
                s[section] = {};
            }
            if (subField) {
                if (!s[section][field]) {
                    s[section][field] = {};
                }
                s[section][field][subField] = value;
            }
            if (section === 'serviceData' && field === 'boat') {
                s[section][field] = [value];
            } else {
                s[section][field] = value;
            }
        });
    };

    const handleSave = async () => {
        setLoading(true);
        setOperationStatus('idle');

        try {
            if (selection === 'client') {
                if (clientData.uid) {
                    console.log('firing');
                    await editInCollection('clients', clientData.uid, clientData);
                } else {
                    await addToCollection('clients', clientData);
                }
            } else if (selection === 'boat') {
                if (boatData.id) {
                    await editInCollection('boats', boatData.id, boatData);
                } else {
                    await addToCollection('boats', boatData);
                }
            } else if (selection === 'service') {
                console.log('serviceData', serviceData);
                if (serviceData.id) {
                    await editInCollection('services', serviceData.id, serviceData);
                } else {
                    await addToCollection('services', serviceData);
                }
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
                // Reset editId if it's an edit operation
                if (FormStore.currentState.editId) {
                    FormStore.update((s) => {
                        s.editId = null;
                    });
                }
            }, 2000);
        }
    };

    const renderForm = () => {
        switch (selection) {
            case 'client':
                return <ClientForm handleInputChange={handleInputChange('clientData')} />;
            case 'boat':
                return <BoatForm handleInputChange={handleInputChange('boatData')} />;
            case 'service':
                return <ServiceForm handleInputChange={handleInputChange('serviceData')} />;

            default:
                return null;
        }
    };

    return (
        <Modal
            open={true}
            onClose={() => {
                setOpenModal(false);
                FormStore.update((s) => {
                    s.editId = null;
                    s.serviceData = null;
                });
            }}
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
                        <CircularProgress color='inherit' size={160} />
                    ) : operationStatus === 'success' ? (
                        <Check sx={{ fontSize: 160, color: 'green' }} />
                    ) : operationStatus === 'error' ? (
                        <Close sx={{ fontSize: 160, color: 'red' }} />
                    ) : null}
                </Backdrop>
                <Typography
                    id='modal-title'
                    variant='h4'
                    component='h2'
                    color='#045174'
                    sx={{ marginBottom: '2rem', fontWeight: 'bold' }}
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
                    <CustomTooltip
                        title={
                            loading
                                ? 'Saving in progress...'
                                : operationStatus !== 'idle'
                                ? 'Operation in progress...'
                                : disableSave && selection === 'boat'
                                ? 'Please make sure you select a client and fill in a boat name'
                                : disableSave && selection === 'client'
                                ? 'Please make sure you fill in a name and an email address'
                                : disableSave && selection === 'service'
                                ? 'Please make sure you select a client, a vessel, and at least one service'
                                : ''
                        }
                        disableHoverListener={
                            !loading && operationStatus === 'idle' && !disableSave
                        }
                    >
                        <span>
                            <Button
                                onClick={handleSave}
                                disabled={loading || operationStatus !== 'idle' || disableSave}
                                variant='contained'
                                sx={{ mt: '2rem', fontWeight: 'bold', width: 'fit-content' }}
                                color='primary'
                            >
                                Save
                            </Button>
                        </span>
                    </CustomTooltip>
                </Box>
            </Box>
        </Modal>
    );
};

export default AdminForms;
