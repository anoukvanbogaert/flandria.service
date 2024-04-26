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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import {
    Email,
    AccountCircle,
    DirectionsBoat,
    Build,
    Check,
    Close,
    Replay,
    Badge,
    ShortText,
    Comment,
    DateRange,
} from '@mui/icons-material';
import { addToCollection } from '../utils/getData';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import CustomAnimatedButton from './CustomAnimatedButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ClientForm from './ClientForm';

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
    console.log('serviceData', serviceData);
    const { boats, clients, serviceTemplates } = useStoreState(AppStore);

    const filteredServiceTemplates = serviceTemplates.filter((template) => template.description);

    useEffect(() => {
        console.log('clientData.client', clientData.client);
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
            model: '',
            remark: null,
        });
        setOperationStatus('idle');
    };
    const renderForm = () => {
        if (selection === 'client') {
            return (
                // <ClientForm
                //     handleClientInputChange={handleClientInputChange}
                //     clientData={clientData}
                // />
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
                            onChange={(e) => {
                                handleClientInputChange('name', e.target.value);
                            }}
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
                                multiple
                                onChange={(event) =>
                                    handleClientInputChange('boat', event.target.value)
                                }
                                label='Select vessel (if any)'
                            >
                                {boats.map((boat) => (
                                    <MenuItem key={boat.id} value={boat.id}>
                                        {`${boat.name} (${boat.brand}, ${boat.model})`}
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
                                getOptionLabel={(option) => option.label || ''}
                                onChange={(event, newValue) => {
                                    handleBoatInputChange('client', newValue.uid || '');
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
        } else if (selection === 'service') {
            return (
                <>
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
                            getOptionLabel={(option) => option.label || ''}
                            onChange={(event, newValue) => {
                                const id = newValue ? newValue.uid : '';
                                handleServiceInputChange('client', id);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Choose a client'
                                    fullWidth
                                    value={serviceData.client}
                                    variant='filled'
                                    size='small'
                                />
                            )}
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
                                value={serviceData.boat}
                                onChange={(event) =>
                                    handleServiceInputChange('boat', event.target.value)
                                }
                                label='Select vessel'
                            >
                                {userBoats.map((boat) => (
                                    <MenuItem key={boat.id} value={boat.id}>
                                        {`${boat.name} (${boat.brand}, ${boat.model})`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <Build />
                    </Grid>
                    <Grid item xs={11}>
                        <FormControl fullWidth variant='filled' size='small'>
                            <InputLabel id='service-select-label'>Select service</InputLabel>
                            <Select
                                labelId='service-select-label'
                                multiple
                                value={serviceData.services}
                                onChange={(event) =>
                                    handleServiceInputChange('services', event.target.value)
                                }
                                label='Select service'
                            >
                                {filteredServiceTemplates.map((template) => (
                                    <MenuItem key={template.id} value={template.description}>
                                        {template.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={1}>
                        <DateRange />
                    </Grid>
                    <Grid item xs={11}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='Select date'
                                value={serviceData.date}
                                onChange={(newValue) => handleServiceInputChange('date', newValue)}
                                slotProps={{ textField: { size: 'small', variant: 'filled' } }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={1}>
                        <Comment />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label='Remark'
                            multiline
                            rows={4}
                            placeholder='Enter your remark here'
                            variant='filled'
                            fullWidth
                            onChange={(event) =>
                                handleClientInputChange('selectedRemark', event.target.value)
                            }
                        />
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
