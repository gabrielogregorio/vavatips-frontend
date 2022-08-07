// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { TRACE_SAMPLE_RATE_SENTRY } from './constants.sentry';

if (process.env.NEXT_PUBLIC_SENTRY_IS_ENABLED === 'true') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: TRACE_SAMPLE_RATE_SENTRY,
  });
}
