import {React, useEffect, useState} from 'react';
import axios from "axios";

const Home = () => {
  // need to move below to a hook in order to make it work!
  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/services")
    ])
      .then(all => {
        // res.json();
        const services = all[0].data;
        setBackendData(services);
        console.log('backendData', backendData);
      });
    // .then(data => {
    //   setBackendData(data);
    // }
    // );
  }, []);
  return (
    <div className="home">
      {/* {(typeof backendData === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.map((service) => (
          <p key={service.id}>{service.id}</p>
        ))
      )} */}
      <p>Loading...</p>
    </div>
  );
};

export default Home;