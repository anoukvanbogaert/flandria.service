import {useState, useEffect} from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    users: [],
    user: null,
    services: []
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/services")
    ])
      .then(all => {
        const services = all[0].data;
        setState(prev => ({...prev, services}));;
      });

  }, []);

  return {
    state
  };
};

export default useApplicationData;