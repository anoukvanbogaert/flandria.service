import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/images/logo1.png" alt="logo"></img>
      </div>
      <div className="navbar__contact">
        <p>INFO@FLANDRIAYACHTS.COM</p>
        <p>+34 965 270285</p>
      </div>
    </nav>
  );
};

export default Navbar;