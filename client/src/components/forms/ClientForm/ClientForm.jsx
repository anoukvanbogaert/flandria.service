import { React, useEffect, useState } from 'react';
import {
    Email,
    AccountCircle,
    DirectionsBoat,
    ContactMail,
    Home,
    Phone,
    MedicalServices,
} from '@mui/icons-material';
import {
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../../stores/AppStore';
import { FormStore } from '../../../stores/FormStore';
import Residence from './Residence';
import Domicile from './Domicile';
import Cellphones from './Cellphones';

const ClientForm = ({ handleInputChange }) => {
    const [loading, setLoading] = useState(true);
    const { boats, clients } = useStoreState(AppStore);
    const { editId, clientData } = useStoreState(FormStore);
    console.log('clientData', clientData);
    console.log('editId', editId);

    useEffect(() => {
        if (editId) {
            const editData = clients.find((client) => client.uid === editId);
            console.log('editData', editData);
            FormStore.update((s) => {
                s.clientData = editData || {};
            });
            setLoading(false);
        }
    }, [editId, clients]);

    useEffect(() => {
        if (!editId) {
            FormStore.update((s) => {
                s.clientData = { email: '', boat: [], name: '' };
            });
        }
    }, [editId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='space-between'
            sx={{ marginLeft: 0, width: 'auto ' }}
        >
            <Grid item xs={1}>
                <AccountCircle color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <TextField
                    hiddenLabel
                    value={clientData.name}
                    placeholder='Full Name'
                    variant='filled'
                    fullWidth
                    size='small'
                    onChange={(e) => {
                        handleInputChange('name', e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={1}>
                <Email color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <TextField
                    hiddenLabel
                    value={clientData.email}
                    placeholder='Email'
                    variant='filled'
                    fullWidth
                    size='small'
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />
            </Grid>
            <Grid item xs={1}>
                <DirectionsBoat color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <FormControl fullWidth variant='filled' size='small'>
                    <InputLabel id='service-select-label'></InputLabel>
                    <Select
                        labelId='service-select-label'
                        value={clientData.boat || []}
                        multiple
                        onChange={(event) => handleInputChange('boat', event.target.value)}
                        hiddenLabel
                    >
                        {boats.map((boat) => (
                            <MenuItem key={boat.id} value={boat.id}>
                                {`${boat.boatName} (${boat.brand} ${boat.model})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1}>
                <ContactMail color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Residence handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
            <Grid item xs={1}>
                <Home color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Domicile handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
            <Grid item xs={1}>
                <Phone color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Cellphones handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
        </Grid>
    );
};

export default ClientForm;
