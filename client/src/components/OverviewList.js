import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Grid, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from 'date-fns';
import './OverviewList.scss';

const OverviewList = ({ service }) => {
    const serviceDate = format(service.serviceDate.toDate(), 'dd MMMM yyyy');
    return (
        <ListItem className='services_container'>
            <Grid container alignItems='center'>
                <Grid item xs={12} sm={6} className='service_box'>
                    <ListItemAvatar className='service_box_avatar'>
                        <Avatar>
                            <EventIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        className='service_box_text'
                        primary={service.serviceName}
                        secondary={`Date: ${serviceDate}`}
                    />
                </Grid>
                <Grid item xs={12} sm={6} className='service_box'>
                    <ListItemAvatar className='service_box_avatar'>
                        <Avatar>
                            <DescriptionIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='service_box_text' primary={service.serviceRemark} />
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default OverviewList;
