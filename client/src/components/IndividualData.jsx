import React from 'react';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import { Grid, Typography, Box } from '@mui/material';
import { getClientNameById, getBoatNameById } from '../utils/getData';
import { keyMapping, orderedKeys, findData, findTitle } from '../utils/individualDataHelpers';
import { Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const IndividualData = () => {
    const { clients, boats, services, individualData } = useStoreState(AppStore);
    const individualCollection = individualData.collection;
    const individualId = individualData.id;

    const dataToShow = findData(
        individualId,
        individualCollection,
        clients,
        boats,
        services,
        getClientNameById
    );
    const titleToShow = findTitle(individualCollection);

    const filteredDataToShow = Object.keys(dataToShow).reduce((acc, key) => {
        if (keyMapping[key] !== undefined) {
            acc[key] = dataToShow[key];
        }
        return acc;
    }, {});

    const sortedEntries = Object.entries(filteredDataToShow)
        .filter(([key]) => key in keyMapping)
        .sort(([a], [b]) => {
            const indexA = orderedKeys.indexOf(a);
            const indexB = orderedKeys.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
        });
    console.log('sortedEntries', sortedEntries);

    return (
        <Box
            sx={{
                margin: '2rem',
                borderRadius: '10px',
                color: '#045174',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography
                    variant='h4'
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '2rem',
                    }}
                >
                    {`${titleToShow} Info`}
                </Typography>
                <IconButton
                    aria-label='close'
                    size='small'
                    sx={{ display: 'flex', alignItems: 'flex-start', height: 'fit-content' }}
                    onClick={() => {
                        AppStore.update((s) => {
                            s.individualData = {
                                collection: '',
                                id: null,
                            };
                        });
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Grid container>
                {sortedEntries.map(([key, value], index) => (
                    <Grid item xs={12} container key={index}>
                        <Grid item xs={4}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                {keyMapping[key]}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {key === 'owner' && value ? (
                                <Chip
                                    label={value.toString()}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        AppStore.update((s) => {
                                            s.individualData = {
                                                collection: 'clients',
                                                id: dataToShow.client,
                                            };
                                        });
                                    }}
                                    sx={{
                                        backgroundColor: '#ceeefd',
                                        color: '#045174',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                    }}
                                />
                            ) : key === 'boat' ? (
                                value.map((boatId) => (
                                    <Chip
                                        key={boatId}
                                        label={getBoatNameById(boatId, boats)}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            AppStore.update((s) => {
                                                s.individualData = {
                                                    collection: 'boats',
                                                    id: boatId,
                                                };
                                            });
                                        }}
                                        sx={{
                                            backgroundColor: 'lightGreen',
                                            color: 'darkGreen',
                                            cursor: 'pointer',
                                            fontSize: '15px',
                                            margin: '5px',
                                        }}
                                    />
                                ))
                            ) : key === 'residence' || key === 'domicile' ? (
                                <Box>
                                    <Box sx={{ height: '1rem' }} />
                                    <Typography variant='subtitle2'>
                                        {`${value.street} ${value.number}`}
                                    </Typography>
                                    <Typography variant='subtitle2'>
                                        {`${value.zip} ${value.city}`}
                                    </Typography>
                                    <Typography variant='subtitle2'>{value.province}</Typography>
                                    <Typography variant='subtitle2'>{value.country}</Typography>
                                </Box>
                            ) : key === 'emergencyContact1' || key === 'emergencyContact2' ? (
                                <Box>
                                    <Typography variant='subtitle2'>{value.name}</Typography>
                                    <Typography variant='subtitle2'>{value.cellphone}</Typography>
                                </Box>
                            ) : (
                                <Typography variant='subtitle1'>
                                    {typeof value === 'object'
                                        ? JSON.stringify(value, null, 2)
                                        : value.toString()}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default IndividualData;
