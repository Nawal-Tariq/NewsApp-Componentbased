import React from 'react';

const Spinner = () => (
  <div className="text-center my-5">
    <div className="bouncing-dots">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="spinner-text">Fetching latest news...</div>
  </div>
);

export default Spinner;
