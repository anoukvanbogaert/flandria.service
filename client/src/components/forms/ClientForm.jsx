import { React, useEffect } from 'react';
import { Email, AccountCircle, DirectionsBoat } from '@mui/icons-material';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import { FormStore } from '../../stores/FormStore';

const ClientForm = ({ handleInputChange }) => {
    const { boats, clients } = useStoreState(AppStore);
    const { editId, clientData } = useStoreState(FormStore);
    console.log('clientData', clientData);

    useEffect(() => {
        if (editId) {
            const editData = clients.find((client) => client.uid === editId);
            FormStore.update((s) => {
                s.clientData = editData || {};
            });
        }
    }, [editId, clients]);

    useEffect(() => {
        if (!editId) {
            FormStore.update((s) => {
                s.clientData = { email: '', boat: [], name: '' };
            });
        }
    }, [editId]);

    return (
        <Grid
            container
            spacing={3}
            alignItems='center'
            justifyContent='space-between'
            sx={{ marginLeft: 0, width: 'auto ' }}
        >
            <Grid item xs={1}>
                <AccountCircle color='secondary' />
            </Grid>
            <Grid item xs={11}>
                <TextField
                    label='Add name'
                    value={clientData.name}
                    placeholder='Add name'
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
                    label='Add email'
                    value={clientData.email}
                    placeholder='Add email'
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
                    <InputLabel id='service-select-label'>Select vessel</InputLabel>
                    <Select
                        labelId='service-select-label'
                        value={clientData.boat || []}
                        multiple
                        onChange={(event) => handleInputChange('boat', event.target.value)}
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
        </Grid>
    );
};

export default ClientForm;
