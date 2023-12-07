import React from 'react';

const Loader: React.FC = () => {
  return (
    <>
      <div className="loader-wrapper">
        <div className="loader loader-1">
          <div className="loader-outter"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner-1"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
