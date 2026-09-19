import React, { Component } from 'react';
import ErrorBoundaryFallback from '../components/feedback/ErrorBoundaryFallback';
import errorLogger from '../core/errors/errorLogger';

/**
 * Enterprise React Error Boundary
 * Wraps top-level app or feature sub-trees to prevent white-screens.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    errorLogger.error(error, errorInfo, {
      boundaryName: this.props.name || 'AnonymousBoundary'
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({
              error: this.state.error,
              resetErrorBoundary: this.resetErrorBoundary
            })
          : this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
          title={this.props.fallbackTitle}
          subtitle={this.props.fallbackSubtitle}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
