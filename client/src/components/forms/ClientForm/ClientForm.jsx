import { React, useEffect, useState } from 'react';
import {
    Email,
    AccountCircle,
    DirectionsBoat,
    ContactMail,
    Home,
    Phone,
    MedicalServices,
    Fingerprint,
} from '@mui/icons-material';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../../stores/AppStore';
import { FormStore } from '../../../stores/FormStore';
import Residence from './Residence';
import Domicile from './Domicile';
import Cellphones from './Cellphones';
import ICE from './ICE';
import Identity from './Identity';
import Subtitle from '../../Subtitle';

const ClientForm = ({ handleInputChange }) => {
    const [loading, setLoading] = useState(true);
    const { boats, clients } = useStoreState(AppStore);
    const { editId, clientData } = useStoreState(FormStore);

    useEffect(() => {
        if (editId) {
            console.log('editId', editId);
            const editData = clients.find((client) => client.uid === editId);
            FormStore.update((s) => {
                s.clientData = editData || {};
            });
            setLoading(false);
        }
    }, [editId, clients]);

    useEffect(() => {
        if (!editId) {
            setLoading(false);
            FormStore.update((s) => {
                s.clientData = { email: '', boat: [], name: '' };
            });
        }
    }, [editId, clients]);

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
                    value={clientData.name || ''}
                    placeholder='Full Name'
                    label='Full Name'
                    variant='outlined'
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
                    value={clientData.email || ''}
                    placeholder='Email'
                    label='Email'
                    variant='outlined'
                    fullWidth
                    size='small'
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />
            </Grid>
            <Grid item xs={1}>
                <DirectionsBoat color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <FormControl fullWidth variant='outlined' size='small'>
                    <InputLabel id='service-select-label'>Select Vessel</InputLabel>
                    <Select
                        labelId='service-select-label'
                        value={clientData.boat || []}
                        label='Select vessel'
                        multiple
                        onChange={(event) => handleInputChange('boat', event.target.value)}
                        hiddenlabel
                    >
                        {boats.map((boat) => (
                            <MenuItem
                                key={boat.id}
                                value={boat.id}
                                disabled={boat?.client && boat?.client !== clientData.uid}
                            >
                                {`${boat.boatName} (${boat.brand} ${boat.model})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Subtitle subtitle='Residence' />
            <Grid item xs={1}>
                <ContactMail color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Residence handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
            <Subtitle subtitle='Domicile' />
            <Grid item xs={1}>
                <Home color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Domicile handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
            <Subtitle subtitle='Contact' />
            <Grid item xs={1}>
                <Phone color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Cellphones handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
            <Grid item xs={1}>
                <MedicalServices color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <ICE handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
            <Subtitle subtitle='Identification' />
            <Grid item xs={1}>
                <Fingerprint color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <Identity handleInputChange={handleInputChange} clientData={clientData} />
            </Grid>
        </Grid>
    );
};

export default ClientForm;
