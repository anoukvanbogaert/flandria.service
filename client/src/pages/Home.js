import React from 'react';
import OverviewList from '../components/clientView/OverviewList';
import './Home.scss';

const Home = () => {
    return (
        <>
            <h1 className='home_title'>Services Overview</h1>
            <OverviewList />
        </>
    );
};

export default Home;
