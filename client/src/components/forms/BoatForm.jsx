import { React, useEffect, useState } from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

import { AccountCircle, DirectionsBoat, Badge, ShortText, Comment } from '@mui/icons-material';
import { useStoreState } from 'pullstate';

import { AppStore } from '../../stores/AppStore';
import { FormStore } from '../../stores/FormStore';

const BoatForm = ({ handleInputChange }) => {
    const { clients, boats } = useStoreState(AppStore);
    const { editId, boatData } = useStoreState(FormStore);
    const [clientValue, setClientValue] = useState(null);

    useEffect(() => {
        if (editId) {
            const editData = boats.find((boat) => boat.id === editId) || boatData;
            FormStore.update((s) => {
                s.boatData = editData || {};
            });
        } else {
            FormStore.update((s) => {
                s.boatData = { client: '', boatName: '', brand: '', model: '', remark: '' };
            });
        }
    }, [editId, boats]);

    return (
        <>
            <Grid
                container
                spacing={3}
                alignItems='center'
                justifyContent='space-between'
                sx={{ marginLeft: 0, width: 'auto' }}
            >
                <Grid item xs={1}>
                    <AccountCircle color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <Autocomplete
                        freeSolo
                        options={clients.map((option) => ({
                            label: option.name,
                            uid: option.id,
                        }))}
                        value={clientValue}
                        onChange={(event, newValue) => {
                            setClientValue(newValue);
                            handleInputChange('client', newValue ? newValue.uid : '');
                        }}
                        getOptionLabel={(option) => option.label || ''}
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
                    <Badge color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Boat Name'
                        placeholder='Enter boat name'
                        fullWidth
                        value={boatData.boatName}
                        variant='filled'
                        size='small'
                        onChange={(e) => handleInputChange('boatName', e.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <DirectionsBoat color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Boat Brand'
                        placeholder='e.g. Sunseeker'
                        fullWidth
                        value={boatData.brand}
                        variant='filled'
                        size='small'
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <ShortText color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Boat Model'
                        value={boatData.model}
                        placeholder='e.g. Manhattan'
                        fullWidth
                        variant='filled'
                        size='small'
                        onChange={(e) => handleInputChange('model', e.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Comment color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Remark'
                        placeholder='Enter any remarks'
                        fullWidth
                        value={boatData.remark}
                        variant='filled'
                        size='small'
                        multiline
                        rows={4}
                        onChange={(e) => handleInputChange('remark', e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default BoatForm;
