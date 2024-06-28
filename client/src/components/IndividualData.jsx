import React from 'react';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import { Grid, Typography, Box } from '@mui/material';
import { getClientNameById } from '../utils/getData';

const IndividualData = () => {
    const { clients, boats, services, individualData } = useStoreState(AppStore);
    const individualCollection = individualData.collection;
    const individualId = individualData.id;

    const findData = (uid) => {
        let data;
        switch (individualCollection) {
            case 'clients':
                data = clients.find((item) => item.id === uid);
                break;
            case 'boats':
                data = boats.find((item) => item.id === uid);
                if (data) {
                    data = {
                        ...data,
                        owner: getClientNameById(data.client, clients),
                    };
                    delete data.client;
                    delete data.LastAdded;
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

    const orderedKeys = ['boatName', 'owner', 'id', 'brand', 'model'];
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
                            <Typography
                                variant='subtitle1'
                                sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>
                                {typeof value === 'object'
                                    ? JSON.stringify(value, null, 2)
                                    : value.toString()}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default IndividualData;
