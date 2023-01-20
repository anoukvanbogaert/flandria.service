import React from 'react';
import axios from "axios";

const Home = ({state}) => {
  console.log('state', state);
  const services = state.services;

  return (
    <div className="home">
      {(services.length === 0) ? (
        <p>Loading...</p>
      ) : (
        services.map(service => (
          <p key={service.id}>{service.id}</p>
        ))
      )}
      <p>Loading...</p>
    </div>
  );
};

export default Home;