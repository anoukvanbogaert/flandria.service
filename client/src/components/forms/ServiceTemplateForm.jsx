import React, { useEffect, useState } from 'react';
import { Grid, TextField, Typography, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import { FormStore } from '../../stores/FormStore';

const ServiceTemplateForm = () => {
    const { clients, boats, services } = useStoreState(AppStore);
    const { editId, serviceData } = useStoreState(FormStore);

    const [formData, setFormData] = useState({
        name: '',
        item1: '',
        item2: '',
        item3: '',
    });

    const fields = [
        { id: 'name', label: 'Service Name', placeholder: 'Service Name', name: 'name' },
        { id: 'item1', label: 'Item 1', placeholder: 'Item 1', name: 'item1' },
        { id: 'item2', label: 'Item 2', placeholder: 'Item 2', name: 'item2' },
        { id: 'item3', label: 'Item 3', placeholder: 'Item 3', name: 'item3' },
    ];

    useEffect(() => {
        if (editId) {
            const editData = services.find((service) => service.id === editId) || serviceData;
            setFormData({
                name: clients.find((client) => client.id === editData.client)?.name || 'Unknown',
                boat: boats.find((boat) => boat.id === editData.boat) || 'Unknown',
            });
            FormStore.update((s) => {
                s.serviceData = editData || {};
            });
        }
    }, [editId, clients, boats, services]);

    const handleFieldChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    return (
        <Grid container spacing={3} sx={{ width: '600px', margin: 0, paddingRight: '1.5rem' }}>
            <Grid item xs={12}>
                <Typography id='modal-title' variant='h2' component='h2' color='primary'>
                    Which service would you like to add?
                </Typography>
            </Grid>
            {fields.map((field, index) => (
                <Grid item xs={6} key={field.id}>
                    <Typography variant='body2' fontWeight='bold'>
                        {field.label}
                    </Typography>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id={field.id}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleFieldChange(field.name)}
                        variant='outlined'
                        sx={{ margin: '0.5rem 0 0 0 !important' }}
                    />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Box display='flex' justifyContent='flex-end' paddingBottom='1.5rem'>
                    <Button
                        startIcon={<ArrowBack />}
                        sx={{ color: 'grey', textTransform: 'none', marginRight: '8px' }}
                    >
                        Back
                    </Button>
                    <Button variant='contained' color='primary' sx={{ textTransform: 'none' }}>
                        Save
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ServiceTemplateForm;
