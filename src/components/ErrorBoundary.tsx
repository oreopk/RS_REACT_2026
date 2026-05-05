import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error, info);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="page-wrapper">
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>Reload app</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
