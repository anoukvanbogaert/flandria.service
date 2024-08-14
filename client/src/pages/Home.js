import React from 'react';
import OverviewList from '../components/clientView/OverviewList';
import { Box, Typography } from '@mui/material';
import './Home.scss';

const Home = () => {
    return (
        <Box className='home__container'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography
                    variant='h4'
                    sx={{
                        textAlign: 'center',
                        width: '100%',
                        color: '#045174',
                        fontWeight: 'bold',
                        margin: '1rem',
                    }}
                >
                    Services Overview
                </Typography>
            </Box>
            <OverviewList />
        </Box>
    );
};

export default Home;
