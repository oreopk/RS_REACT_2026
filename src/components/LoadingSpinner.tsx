import React from 'react';
import './LoadingSpinner.css';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
}

export default LoadingSpinner;
