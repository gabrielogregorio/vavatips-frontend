import { Component, ReactNode } from 'react';
import { ScreenError } from './screenError';

const sendLogsToServer = (error, errorInfo) => `${error} ${errorInfo}`;

type propsErrorBoundaryType = {
  children: ReactNode;
};

type stateErrorBoundaryType = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<propsErrorBoundaryType, stateErrorBoundaryType> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  private static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    sendLogsToServer(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ScreenError tryRenderAgain={() => this.setState({ hasError: false })} />;
    }

    return children;
  }
}
