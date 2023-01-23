import {useState, useEffect} from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    users: [],
    user: null,
    services: [],
    overview: []
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/services"),
      axios.get("http://localhost:5000/overview")
    ])
      .then(all => {
        const services = all[0].data;
        const overview = all[1].data;
        setState(prev => ({...prev, services, overview}));;
      });

  }, []);

  return {
    state
  };
};

export default useApplicationData;