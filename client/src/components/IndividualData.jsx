import React from 'react';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import { Grid, Typography, Box } from '@mui/material';

const IndividualData = () => {
    const { clients, boats, services, individualData } = useStoreState(AppStore);
    const individualCollection = individualData.collection;
    const individualId = individualData.id;

    console.log('individualData', individualData);

    const findData = (uid) => {
        let data;
        switch (individualCollection) {
            case 'clients':
                data = clients.find((item) => item.id === uid);
                break;
            case 'boats':
                data = boats.find((item) => item.id === uid);
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
    console.log('dataToShow', dataToShow);

    return (
        <Box
            sx={{
                backgroundColor: '#ceeefd',
                margin: '2rem 0 -3rem 0',
                borderRadius: '10px',
                color: '#045174',
                width: 'min-content',
            }}
        >
            <Grid container spacing={0} sx={{ margin: '2rem', width: 'auto' }}>
                <Grid item xs={12} sx={{ padding: '0 !important' }}>
                    <Typography
                        variant='h4'
                        sx={{ fontWeight: 'bold', marginBottom: '2rem' }}
                    >{`${titleToShow} info`}</Typography>
                </Grid>
                {Object.entries(dataToShow).map(([key, value], index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={12} container wrap='nowrap' spacing={1}>
                            <Grid item>
                                <Typography
                                    variant='subtitle1'
                                    sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                                >
                                    {key}:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='subtitle1'>
                                    {typeof value === 'object'
                                        ? JSON.stringify(value, null, 2)
                                        : value.toString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default IndividualData;
