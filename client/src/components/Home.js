import React from 'react';
import OverviewList from './OverviewList';
import ServiceList from './ServiceList';

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
      <div className="home__table">
        {(services.length === 0) ? (
          <p>Loading...</p>
        ) : (
          <ServiceList
            key={services.id}
            services={services} />
        )}
      </div>
    </div>
  );
};

export default Home;