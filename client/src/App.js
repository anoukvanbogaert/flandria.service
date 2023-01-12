import './App.css';

import {React, useEffect, useState} from 'react';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/services")
      .then(res => res.json())
      .then(data => {
        setBackendData(data);
      }
      );
  }, []);

  return (
    <div>
      {/* {(typeof backendData === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.map((service, i) => (
          <p key={i}>{service}</p>
        ))
      )} */}
      <p>Loading...</p>
    </div>
  );
}

export default App;
