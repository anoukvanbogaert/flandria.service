import { React, useEffect, useState } from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

import { AccountCircle, DirectionsBoat, Badge, ShortText, Comment } from '@mui/icons-material';
import { useStoreState } from 'pullstate';

import { AppStore } from '../../stores/AppStore';
import { FormStore } from '../../stores/FormStore';

const BoatForm = ({ handleInputChange }) => {
    const { clients, boats } = useStoreState(AppStore);
    const { editId, boatData } = useStoreState(FormStore);

    const editData = boats.find((boat) => boat.id === editId) || boatData;

    useEffect(() => {
        if (editData) {
            FormStore.update((s) => {
                s.boatData = editData;
            });
        }
    }, [editData]);

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
                        defaultValue={
                            clients.find((client) => client.id === editData.client)
                                ? {
                                      label: clients.find((client) => client.id === editData.client)
                                          .name,
                                      uid: editData.client,
                                  }
                                : null
                        }
                        getOptionLabel={(option) => option.label || ''}
                        onChange={(event, newValue) => {
                            handleInputChange('client', newValue.uid || '');
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
                    <Badge color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Boat Name'
                        placeholder='Enter boat name'
                        fullWidth
                        value={editData.boatName}
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
                        value={editData.brand}
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
                        value={editData.model}
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
                        value={editData.remark}
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
