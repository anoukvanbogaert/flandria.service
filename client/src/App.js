import './App.scss';

import {React, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import useApplicationData from './hooks/useApplicationData';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {

  const {
    state
  } = useApplicationData();

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
                  state={state}
                />
              </section>
            </>
          } />
        </Routes>
      </Router>


    </main>
  );
}

export default App;
