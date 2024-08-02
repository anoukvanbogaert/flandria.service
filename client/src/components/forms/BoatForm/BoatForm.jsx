import { React, useEffect, useState } from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

import {
    AccountCircle,
    DirectionsBoat,
    Badge,
    ShortText,
    Comment,
    Flag,
} from '@mui/icons-material';
import { useStoreState } from 'pullstate';

import { AppStore } from '../../../stores/AppStore';
import { FormStore } from '../../../stores/FormStore';

import Subtitle from '../../Subtitle';
import BrandModel from './BrandModel';
import PortFlag from './PortFlag';

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
                                variant='outlined'
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
                        value={boatData.boatName || ''}
                        variant='outlined'
                        size='small'
                        onChange={(e) => handleInputChange('boatName', e.target.value)}
                    />
                </Grid>
                <Subtitle subtitle='Brand + Model' />
                <Grid item xs={1}>
                    <DirectionsBoat color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <BrandModel handleInputChange={handleInputChange} boatData={boatData} />
                </Grid>
                <Subtitle subtitle='Port + Flag' />
                <Grid item xs={1}>
                    <Flag color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <PortFlag handleInputChange={handleInputChange} boatData={boatData} />
                </Grid>
                <Subtitle subtitle='Notes' />
                <Grid item xs={1}>
                    <Comment color='secondary' />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label='Remark'
                        placeholder='Enter any remarks'
                        fullWidth
                        value={boatData.remark || ''}
                        variant='outlined'
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
