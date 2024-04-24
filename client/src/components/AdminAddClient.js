import { React, useState, useEffect } from 'react';
import './form.scss';
import classNames from 'classnames';
import {
    Button,
    Autocomplete,
    TextField,
    Grid,
    CircularProgress,
    Backdrop,
    Box,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import {
    Email,
    AccountCircle,
    DirectionsBoat,
    EmojiPeople,
    Check,
    Close,
    Replay,
    Badge,
    ShortText,
    Comment,
} from '@mui/icons-material';
import { addToCollection } from '../utils/getData';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import CustomAnimatedButton from './CustomAnimatedButton';

const AdminAddClient = ({ open }) => {
    const [operationStatus, setOperationStatus] = useState('idle');
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        boat: [],
    });

    const [boatData, setBoatData] = useState({
        client: null,
        name: null,
        brand: null,
        model: null,
        remark: null,
    });
    const { boats, clients } = useStoreState(AppStore);
    console.log('boats', boats);

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
                resetForm(); // Call resetForm to clear the data after a delay
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
            model: null,
            remark: null,
        });
        setOperationStatus('idle');
    };

    const renderForm = () => {
        if (selection === 'client') {
            return (
                <>
                    <Grid item xs={1}>
                        <AccountCircle />
                    </Grid>
                    <Grid item xs={11} sx={{ paddingLeft: '40px' }}>
                        <TextField
                            label='Add name'
                            placeholder='Add name'
                            variant='filled'
                            fullWidth
                            size='small'
                            onChange={(e) => handleClientInputChange('name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Email />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label='Add email'
                            placeholder='Add email'
                            variant='filled'
                            fullWidth
                            size='small'
                            onChange={(e) => handleClientInputChange('email', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <DirectionsBoat />
                    </Grid>
                    <Grid item xs={11}>
                        <FormControl fullWidth variant='filled' size='small'>
                            <InputLabel id='service-select-label'>Select vessel</InputLabel>
                            <Select
                                labelId='service-select-label'
                                value={clientData.boat}
                                onChange={(event) =>
                                    handleClientInputChange('boat', event.target.value)
                                }
                                label='Select vessel (if any)'
                            >
                                {boats.map((boat) => (
                                    <MenuItem key={boat.id} value={boat.id}>
                                        {`${boat.boatName} (${boat.brand}, ${boat.model})`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            );
        } else if (selection === 'boat') {
            return (
                <>
                    <Grid
                        container
                        spacing={3}
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{ margin: '1.5rem 0' }}
                    >
                        <Grid item xs={1}>
                            <AccountCircle />
                        </Grid>
                        <Grid item xs={11}>
                            <Autocomplete
                                freeSolo
                                options={clients.map((option) => ({
                                    label: option.name,
                                    uid: option.id,
                                }))}
                                onChange={(event, newValue) => {
                                    const id = newValue ? newValue.uid : '';
                                    handleBoatInputChange('client', id);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Choose a client'
                                        fullWidth
                                        variant='filled'
                                        size='small'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Badge />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                label='Boat Name'
                                placeholder='Enter boat name'
                                fullWidth
                                variant='filled'
                                size='small'
                                onChange={(e) => handleBoatInputChange('name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <DirectionsBoat />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                label='Boat Brand'
                                placeholder='e.g. Sunseeker'
                                fullWidth
                                variant='filled'
                                size='small'
                                onChange={(e) => handleBoatInputChange('brand', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <ShortText />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                label='Boat Model'
                                value={boatData.model}
                                placeholder='e.g. Manhattan'
                                fullWidth
                                variant='filled'
                                size='small'
                                onChange={(e) => handleBoatInputChange('model', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Comment />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                label='Remark'
                                placeholder='Enter any remarks'
                                fullWidth
                                variant='filled'
                                size='small'
                                multiline
                                rows={4}
                                onChange={(e) => handleBoatInputChange('remark', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </>
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
