import React from 'react';
import './Logo.css';
import logo from '../../assets/logo.gif';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img src={logo} className="image" alt="logo" />
      <span className="title">Remuneration</span>
    </div>
  );
};

export default Logo;
