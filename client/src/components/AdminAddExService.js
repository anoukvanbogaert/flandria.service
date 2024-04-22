import { React, useState, useEffect } from 'react';
import './form.scss';
import classNames from 'classnames';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    CircularProgress,
    Backdrop,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton } from '@mui/lab';
import {
    Build,
    DateRange,
    AccountCircle,
    DirectionsBoat,
    Comment,
    Check,
    Close,
} from '@mui/icons-material';
import { addToCollection } from '../utils/getData';

const AdminAddExService = ({ open }) => {
    const { serviceTemplates, clients, boats } = useStoreState(AppStore);
    const [userBoats, setUserboats] = useState([]);
    const [operationStatus, setOperationStatus] = useState('idle');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        services: [],
        date: null,
        client: null,
        boat: [],
        brand: null,
        model: null,
        remark: null,
    });
    console.log('formData', formData);

    useEffect(() => {
        if (formData.client) {
            const clientId = formData.client;
            console.log('clientId', clientId);

            const client = clients.find((c) => c.uid === clientId);
            console.log('client', client);

            if (client && client.boats) {
                const userBoats = boats.filter((boat) => client.boats.includes(boat.id));
                setUserboats(userBoats);
            } else {
                setUserboats([]);
            }
        }
    }, [formData.client, clients, boats]);

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
                    services: [],
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
                    <CircularProgress color='inherit' size={300} />
                ) : operationStatus === 'success' ? (
                    <Check sx={{ fontSize: 300, color: 'green' }} />
                ) : operationStatus === 'error' ? (
                    <Close sx={{ fontSize: 300, color: 'red' }} />
                ) : null}
            </Backdrop>
            <Box
                className={formClass}
                sx={{
                    margin: 'auto',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
            >
                <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ marginBottom: '1.5rem' }}
                ></Grid>
                <Grid container spacing={3} alignItems='center'>
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
                                handleInputChange('client', id);
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
                        <DirectionsBoat />
                    </Grid>
                    <Grid item xs={11}>
                        <FormControl fullWidth variant='filled' size='small'>
                            <InputLabel id='service-select-label'>Select vessel</InputLabel>
                            <Select
                                labelId='service-select-label'
                                value={formData.boat}
                                onChange={(event) => handleInputChange('boat', event.target.value)}
                                label='Select vessel'
                            >
                                {userBoats.map((boat) => (
                                    <MenuItem key={boat.id} value={boat.id}>
                                        {`${boat.boatName} (${boat.brand}, ${boat.model})`}
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
                                value={formData.services}
                                onChange={(event) =>
                                    handleInputChange('services', event.target.value)
                                }
                                label='Select service'
                            >
                                {serviceTemplates.map((template) => (
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
                                value={formData.date}
                                onChange={(newValue) => handleInputChange('date', newValue)}
                                slotProps={{ textField: { size: 'small', variant: 'filled' } }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    {/* <Grid item xs={1}>
                        <DirectionsBoat />
                    </Grid>
                    <Grid item xs={11}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label='Boat Brand'
                                    placeholder='e.g. Sunseeker'
                                    fullWidth
                                    variant='filled'
                                    size='small'
                                    onChange={(event) =>
                                        handleInputChange('brand', event.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label='Boat Model'
                                    placeholder='e.g. Manhattan'
                                    fullWidth
                                    variant='filled'
                                    size='small'
                                    onChange={(event) =>
                                        handleInputChange('model', event.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid> */}

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
                                handleInputChange('selectedRemark', event.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography
                            variant='h4'
                            component='h2'
                            className='admin__form__title'
                        ></Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant='contained'
                            sx={{ fontSize: '1rem', fontWeight: 'bold', width: '100%' }}
                            color='primary'
                            disabled={
                                loading ||
                                operationStatus === 'success' ||
                                operationStatus === 'error'
                            }
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminAddExService;
