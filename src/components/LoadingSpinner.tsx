import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div role="status" className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
