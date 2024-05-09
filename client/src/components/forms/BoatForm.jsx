import React from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

import { AccountCircle, DirectionsBoat, Badge, ShortText, Comment } from '@mui/icons-material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';

const BoatForm = ({ handleBoatInputChange, boatData }) => {
    const { clients } = useStoreState(AppStore);
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
                    <Badge color='secondary' />
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
                    <DirectionsBoat color='secondary' />
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
                        onChange={(e) => handleBoatInputChange('model', e.target.value)}
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
};

export default BoatForm;
