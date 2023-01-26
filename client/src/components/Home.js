import React from 'react';
import OverviewList from './OverviewList';
import './Home.scss';

const Home = ({services, overview}) => {

  return (
    <div className="home__container">
      <div className="home__welcome">
        <OverviewList
          key={overview.id}
          overview={overview}
          services={services}
        />
      </div>
    </div>
  );
};

export default Home;