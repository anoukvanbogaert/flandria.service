import React from 'react';
import OverviewList from '../components/clientView/OverviewList';
import { Box } from '@mui/material';
import './Home.scss';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';

const Home = () => {
    return (
        <Box className='home__container'>
            <h1 className='home_title'>Services Overview</h1>
            <OverviewList />
        </Box>
    );
};

export default Home;
