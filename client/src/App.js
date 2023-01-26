import './App.scss';

import {React} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import useApplicationData from './hooks/useApplicationData';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';

function App() {

  const {
    state
  } = useApplicationData();

  console.log('state', state);
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path='/home' element={
            <>
              <section className='nav-block'>
                <Navbar />
              </section>
              <section className="home-block">
                <Home
                  services={state.services}
                  overview={state.overview}
                />
              </section>
            </>
          } />

          <Route path='/admin' element={
            <>
              <section className='nav-block'>
                <Navbar />
              </section>
              <section className="admin-block">
                <Admin />
              </section>
            </>
          } />
        </Routes>
      </Router>


    </main>
  );
}

export default App;
