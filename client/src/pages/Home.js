import React from 'react';
import OverviewList from '../components/OverviewList';
import './Home.scss';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';

const Home = () => {
    const { userDoc } = useStoreState(AppStore);
    console.log('userDoc', userDoc);

    const services = userDoc.services;
    return (
        <>
            <h1 className='home_title'>Services Overview</h1>
            <div className='home__container'>
                <div className='home__welcome'>
                    {services?.map((service, i) => (
                        <OverviewList key={i} service={service} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
