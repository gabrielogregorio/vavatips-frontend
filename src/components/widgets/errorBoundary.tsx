import { AxiosError } from 'axios';
import { Component, ReactNode } from 'react';
import { ScreenError } from './screenError';

const sendLogsToServer = (error: AxiosError, errorInfo: object) => `${error} ${errorInfo}`;

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

  public static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  public componentDidCatch(error: AxiosError, errorInfo: object): void {
    sendLogsToServer(error, errorInfo);
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ScreenError tryRenderAgain={() => this.setState({ hasError: false })} />;
    }

    return children;
  }
}
