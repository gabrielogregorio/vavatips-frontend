import { useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import Header from 'next/head';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { IModalContextSuggestion, modalMessageTypeContext } from '@/types/modal';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContextThemeProvider } from '@/contexts/theme';
import '../styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [modalSuggestion, setModalSuggestion] = useState<IModalContextSuggestion>({
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
  const valueModalSuggestion = useMemo(() => ({ modalSuggestion, setModalSuggestion }), [modalSuggestion]);
  const valueFilters = useMemo(() => ({ tags, filters, setTags, setFilters }), [tags, filters]);

  return (
    <>
      <Header>
        <title>Vavatips - Dicas de gameplay</title>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="language" content="pt-BR" />
        <meta name="theme-color" content="#d85f5fcd " />

        <meta name="description" content="As melhores dicas e pixels do Valorant" />
        <meta
          name="keywords"
          content="valorant,dicas,tips,pixels,fps,granadas,flechas rastreadoras,flechas de choque,Ascent,Bind,Haven,Split,Breeze,Fracture,Icebox,Cypher,Killjoy,Sova,Viper,Sage,Astra,Skye,Reyna,Yoru,Jett,Raze,Phoenix,Kay0,Breach,Omen,Brimstone,chamber,Neon,veneninho,granadas"
        />
        <meta name="author" content="Gabriel Gregorio" />
        <meta name="creator" content="Gabriel Gregorio" />

        <meta property="og:image" content="/images/image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="674" />
        <meta property="og:title" content="Vavatips - Dicas de gameplay" />
        <meta property="og:description" content="As melhores dicas e pixels do Valorant" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://valorant-tips.vercel.app/" />
        <meta property="og:site_name" content="Vavatips - Dicas de gameplay" />
        <meta property="og:locale" content="pt_BR" />
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
