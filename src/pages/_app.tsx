/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import '../styles/global.css';
import { AppProps } from 'next/app';
import Script from 'next/script';
import Header from 'next/head';
import { ContextModalSuggestion, modalContextType } from '@/contexts/modalSuggestion';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage, modalMessageType } from '@/contexts/modalMessage';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [modalSuggestion, setModalSuggestion] = useState<modalContextType>({
    post: null,
    active: false,
  });
  const [modalMessage, setModalMessage] = useState<modalMessageType>({
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

      <ContextModalSuggestion.Provider value={{ modalSuggestion, setModalSuggestion }}>
        <ContextModalMessage.Provider value={{ modalMessage, setModalMessage }}>
          <ContextFilters.Provider value={{ tags, filters, setFilters, setTags }}>
            <Component {...pageProps} />
          </ContextFilters.Provider>
        </ContextModalMessage.Provider>
      </ContextModalSuggestion.Provider>
    </>
  );
}
