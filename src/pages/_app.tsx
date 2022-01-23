/* eslint-disable @next/next/no-page-custom-font */
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
        <Script src="https://kit.fontawesome.com/5136a1e457.js" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

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
