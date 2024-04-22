import { React, useState, useEffect } from 'react';
import './form.scss';
import classNames from 'classnames';
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    CircularProgress,
    Backdrop,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
} from '@mui/material';

import {
    Email,
    AccountCircle,
    DirectionsBoat,
    EmojiPeople,
    Check,
    Close,
} from '@mui/icons-material';
import { addToCollection } from '../utils/getData';

const AdminAddClient = ({ open }) => {
    const [operationStatus, setOperationStatus] = useState('idle');
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: null,
        client: null,
        boat: [],
        brand: null,
        model: null,
        remark: null,
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setOperationStatus('idle');
        try {
            await addToCollection('services', formData);
            setOperationStatus('success');
            setTimeout(() => {
                setFormData({
                    date: null,
                    client: null,
                    boat: [],
                    brand: null,
                    model: null,
                    remark: null,
                }); // Reset form on success
                setOperationStatus('idle');
            }, 2000); // Delay for visual effect
        } catch (error) {
            console.error('Error saving document: ', error);
            setOperationStatus('error');
            setTimeout(() => {
                setOperationStatus('idle');
            }, 2000); // Delay for visual effect
        } finally {
            setLoading(false);
        }
    };

    const formClass = classNames('admin__form', {
        'admin__form--open': open,
        'admin__form--close': !open,
    });
    const resetForm = () => {
        setFormData({ name: '', email: '', brand: '', model: '' });
        setOperationStatus('idle');
        if (operationStatus === 'success') setStep(1); // Return to the first step only on success
    };

    const renderForm = () => {
        if (selection === 'client') {
            return (
                <>
                    <TextField
                        label='Add name'
                        placeholder='Add name'
                        variant='filled'
                        fullWidth
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <TextField
                        label='Add email'
                        placeholder='Add email'
                        variant='filled'
                        fullWidth
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </>
            );
        } else if (selection === 'boat') {
            return (
                <>
                    <TextField
                        label='Boat Brand'
                        placeholder='e.g. Sunseeker'
                        fullWidth
                        variant='filled'
                        size='small'
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                    />
                    <TextField
                        label='Boat Model'
                        placeholder='e.g. Manhattan'
                        fullWidth
                        variant='filled'
                        size='small'
                        onChange={(e) => handleInputChange('model', e.target.value)}
                    />
                </>
            );
        }
    };

    return (
        <Dialog open={true} maxWidth='md' fullWidth>
            <DialogTitle>{step === 1 ? 'Choose an option' : 'Fill in the details'}</DialogTitle>
            <DialogContent>
                {step === 1 ? (
                    <Grid container spacing={2} justifyContent='center' height='auto'>
                        <IconButton
                            size='large'
                            className='dialog__iconbutton'
                            onClick={() => {
                                setSelection('boat');
                                setStep(2);
                            }}
                        >
                            <DirectionsBoat
                                sx={{ fontSize: '8rem', padding: '1rem', color: 'black' }}
                            />
                        </IconButton>
                        <IconButton
                            className='dialog__iconbutton'
                            onClick={() => {
                                setSelection('client');
                                setStep(2);
                            }}
                        >
                            <EmojiPeople
                                sx={{ fontSize: '8rem', padding: '1rem', color: 'black' }}
                            />
                        </IconButton>
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        {renderForm()}
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                {step === 2 && (
                    <>
                        <Button onClick={() => setStep(1)}>Back</Button>
                        <Button
                            onClick={handleSave}
                            disabled={loading || operationStatus !== 'idle'}
                        >
                            Save
                        </Button>
                    </>
                )}
            </DialogActions>
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
        </Dialog>
    );
};

export default AdminAddClient;
