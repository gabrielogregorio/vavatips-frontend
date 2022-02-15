/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import Header from 'next/head';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { modalContextTypeSuggestion, modalMessageTypeContext } from '@/interfaces/modal';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextThemeProvider from '@/contexts/theme';
import '../styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [modalSuggestion, setModalSuggestion] = useState<modalContextTypeSuggestion>({
    post: null,
    active: false,
  });
  const [modalMessage, setModalMessage] = useState<modalMessageTypeContext>({
    message: { msg: '', type: 'success' },
    active: false,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const valueModalMessage = useMemo(() => ({ modalMessage, setModalMessage }), [modalMessage]);
  const valueModalSuggestion = useMemo(
    () => ({ modalSuggestion, setModalSuggestion }),
    [modalSuggestion],
  );
  const valueFilters = useMemo(() => ({ tags, filters, setTags, setFilters }), [tags, filters]);

  return (
    <>
      <Header>
        <title>Vavatips - Melhore sua gameplay</title>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </Header>

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
