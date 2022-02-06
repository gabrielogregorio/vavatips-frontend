/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import '../styles/global.css';
import { AppProps } from 'next/app';
import Header from 'next/head';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { modalContextTypeSuggestion, modalMessageTypeContext } from '@/interfaces/modal';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextThemeProvider from '@/contexts/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <>
      <Header>
        <title>Vavatips - Melhore sua gameplay</title>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </Header>

      <QueryClientProvider client={queryClient}>
        <ContextThemeProvider>
          <ContextModalSuggestion.Provider value={{ modalSuggestion, setModalSuggestion }}>
            <ContextModalMessage.Provider value={{ modalMessage, setModalMessage }}>
              <ContextFilters.Provider value={{ tags, filters, setFilters, setTags }}>
                <Component {...pageProps} />
              </ContextFilters.Provider>
            </ContextModalMessage.Provider>
          </ContextModalSuggestion.Provider>
        </ContextThemeProvider>
      </QueryClientProvider>
    </>
  );
}
