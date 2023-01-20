import './App.css';

import {React, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/home' element={
            <>
              <section className='nav-block'>
                <Navbar />
              </section>
              <section className="home-block">
                <Home />
              </section>
            </>
          } />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
