import { Component, ReactNode } from 'react';
import { ScreenError } from './screenError';

const sendLogsToServer = (error, errorInfo): string => `${error} ${errorInfo}`;

type propsErrorBoundaryType = {
  children: ReactNode;
};

type stateErrorBoundaryType = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<propsErrorBoundaryType, stateErrorBoundaryType> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
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
