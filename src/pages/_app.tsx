import { useState } from 'react';
import '../styles/global.css';
import { ContextModalSuggestion, modalContextType } from '../core/contexts/modalSuggestion';
import { ContextFilters } from '../core/contexts/filters';
import { ContextModalMessage, modalMessageType } from '../core/contexts/modalMessage';
import Header from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const [modalSuggestion, setModalSuggestion] = useState<modalContextType>({
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
        {/* <!-- Fonte Awesome--> */}
        <script src="https://kit.fontawesome.com/5136a1e457.js" crossOrigin="anonymous"></script>

        {/* <!-- Fonte --> */}
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
