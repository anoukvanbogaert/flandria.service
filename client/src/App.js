import './App.css';

import {React, useEffect, useState} from 'react';
import axios from "axios";

function App() {

  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/services")
    ])
      .then(all => {
        // res.json();
        const services = all[0].data;
        setBackendData(services);
      });
    // .then(data => {
    //   setBackendData(data);
    // }
    // );
  }, []);

  return (
    <div>
      {(typeof backendData === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        // backendData.map((service, i) => (
        //   <p key={i}>{service.id}</p>
        // ))
        console.log('backendData', backendData)
      )}
      <p>Loading...</p>
    </div>
  );
}

export default App;
