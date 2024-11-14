// Header.js
import React from 'react';
import './Header.css';
import logo from '../assets/panda-express-logo.png';

const Header = () => {
  return (
    <header className="header">
      {/* Wrap the logo with an anchor tag to navigate to the home page */}
      <a href="/">
        <img src={logo} alt="Panda Express" className="logo" />
      </a>
      <h1 className="title">Panda Express</h1>

      {/* Wrap the button with an anchor tag to navigate to the login page */}
      <a href="/login" className="signin-link">
        <button className="signin-btn">Sign in</button>
      </a>
    </header>
  );
};

export default Header;
