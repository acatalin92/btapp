import React from 'react';
import './Loader.css';
import loading from '../../assets/loading.gif';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={loading} className="image" alt="logo" />
    </div>
  );
};

export default Loader;
