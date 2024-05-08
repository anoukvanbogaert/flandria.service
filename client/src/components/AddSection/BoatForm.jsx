import React from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { AccountCircle, Badge, DirectionsBoat, ShortText, Comment } from '@mui/icons-material';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';

const BoatForm = () => {
    const { clients } = useStoreState(AppStore);

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
                />
            </Grid>
            <Grid item xs={1}>
                <ShortText />
            </Grid>
            <Grid item xs={11}>
                <TextField
                    label='Boat Model'
                    placeholder='e.g. Manhattan'
                    fullWidth
                    variant='filled'
                    size='small'
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
                />
            </Grid>
        </>
    );
};

export default BoatForm;
