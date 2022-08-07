import { useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import Header from 'next/head';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { IModalContextSuggestion, modalMessageTypeContext } from '@/types/modal';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContextThemeProvider } from '@/contexts/theme';
import { init as SentryInit } from '@sentry/nextjs';
import '../styles/global.css';
import { TRACE_SAMPLE_RATE_SENTRY } from '@/constants/sentry';
import Script from 'next/script';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [modalSuggestion, setModalSuggestion] = useState<IModalContextSuggestion>({
    active: false,
    post: null,
  });
  const [modalMessage, setModalMessage] = useState<modalMessageTypeContext>({
    active: false,
    message: { msg: '', type: 'success' },
  });
  const [tags, setTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const valueModalMessage = useMemo(() => ({ modalMessage, setModalMessage }), [modalMessage]);
  const valueModalSuggestion = useMemo(() => ({ modalSuggestion, setModalSuggestion }), [modalSuggestion]);
  const valueFilters = useMemo(() => ({ filters, setFilters, setTags, tags }), [tags, filters]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_IS_ENABLED === 'true') {
      SentryInit({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: TRACE_SAMPLE_RATE_SENTRY,
      });
    }
  }, []);

  return (
    <>
      <Header>
        <title>Vavatips - Dicas de gameplay</title>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </Header>

      <Script src="/scripts/hotjar.js" />

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />

      <QueryClientProvider client={queryClient}>
        <ContextThemeProvider>
          <ContextModalSuggestion.Provider value={valueModalSuggestion}>
            <ContextModalMessage.Provider value={valueModalMessage}>
              <ContextFilters.Provider value={valueFilters}>
                <Component {...pageProps} />
              </ContextFilters.Provider>
            </ContextModalMessage.Provider>
          </ContextModalSuggestion.Provider>
        </ContextThemeProvider>
      </QueryClientProvider>
    </>
  );
};
export default MyApp;
