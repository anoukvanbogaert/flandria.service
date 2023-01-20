import React from 'react';
import ServiceList from './ServiceList';

const Home = ({services}) => {
  console.log('state', services);
  const test = services[0];
  // console.log('services[0]', test.id);

  return (
    <div className="home__container">
      <div className="home__welcome">
        <p>Service overview for {services.boat_name}</p>
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