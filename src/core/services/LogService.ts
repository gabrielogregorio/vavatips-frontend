import * as Sentry from '@sentry/nextjs';

export class Log {
  private static sentryIsEnabled(action: () => void) {
    if (NEXT_PUBLIC_SENTRY_IS_ENABLED) {
      action();
    }
  }

  public static start() {
    const noSendSentryEvents = null;
    if (!NEXT_PUBLIC_SENTRY_IS_ENABLED) {
      return;
    }

    Sentry.init({
      beforeSend(event, hint) {
        const isMappedError = hint?.originalException === 'abort-router';
        if (isMappedError) {
          return noSendSentryEvents;
        }
        return event;
      },

      dsn: NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: TRACE_SAMPLE_RATE_SENTRY,
      environment: 'dev',
      release: `vavatips@${NEXT_PUBLIC_VERSION}`,
    });
  }

  public static logError(error: unknown): void {
    this.sentryIsEnabled(() => Sentry.captureException(error));
  }

  public static setUser(user: Sentry.User): void {
    this.sentryIsEnabled(() => Sentry.setUser(user));
  }

  public static addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
    this.sentryIsEnabled(() => Sentry.addBreadcrumb(breadcrumb));
  }

  public static logEvent(eventName: string, eventDetails?: Sentry.EventHint | undefined): void {
    this.sentryIsEnabled(() =>
      Sentry.captureEvent({
        message: eventName,
        ...eventDetails,
      }),
    );
  }

  public static logMessage(message: string): void {
    this.sentryIsEnabled(() => Sentry.captureMessage(message));
  }
}
