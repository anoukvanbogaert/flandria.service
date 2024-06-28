import React from 'react';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import { Grid, Typography, Box } from '@mui/material';
import { getClientNameById, getBoatNameById } from '../utils/getData';
import { Chip } from '@mui/material';

const IndividualData = () => {
    const { clients, boats, services, individualData } = useStoreState(AppStore);
    const individualCollection = individualData.collection;
    const individualId = individualData.id;
    console.log('individualData', individualData);

    const findData = (uid) => {
        let data;
        switch (individualCollection) {
            case 'clients':
                data = clients.find((item) => item.uid === uid);
                break;
            case 'boats':
                data = boats.find((item) => item.id === uid);
                if (data) {
                    data = {
                        ...data,
                        owner: getClientNameById(data.client, clients),
                    };
                    delete data.lastAdded;
                }
                break;
            case 'services':
                data = services.find((item) => item.id === uid);
                break;
            default:
                data = null;
        }
        return data;
    };

    const findTitle = () => {
        let title;
        switch (individualCollection) {
            case 'clients':
                title = 'Client';
                break;
            case 'boats':
                title = 'Boat';
                break;
            case 'services':
                title = 'Service';
                break;
            default:
                title = null;
        }
        return title;
    };

    const dataToShow = findData(individualId);
    const titleToShow = findTitle();

    const keyMapping = {
        boatName: 'Boat Name',
        name: 'Client Name',
        owner: 'Owner',
        email: 'Email',
        id: 'Boat ID',
        uid: 'Client ID',
        client: 'Client ID',
        brand: 'Brand',
        model: 'Model',
        boat: 'Boat(s)',
        remark: 'Remark',
    };

    const orderedKeys = [
        'boatName',
        'owner',
        'name',
        'email',
        'uid',
        'id',
        'client',
        'brand',
        'model',
        'remark',
    ];
    const sortedEntries = Object.entries(dataToShow).sort(([a], [b]) => {
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
                width: '30%',
                minWidth: 'min-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
            }}
        >
            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                {`${titleToShow} Info`}
            </Typography>
            <Grid container>
                {sortedEntries.map(([key, value], index) => (
                    <Grid item xs={12} container key={index}>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                {keyMapping[key]}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            {key === 'owner' ? (
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
