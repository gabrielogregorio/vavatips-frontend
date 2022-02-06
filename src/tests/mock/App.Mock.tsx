/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { modalContextTypeSuggestion, modalMessageTypeContext } from '@/interfaces/modal';
import { LocalStorageMock } from '@react-mock/localstorage';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import ContextThemeProvider from '@/contexts/theme';

// eslint-disable-next-line no-unused-vars
function customLog(data) {
  return null;
}
// Custom logger
setLogger({
  log: customLog,
  warn: customLog,
  error: customLog,
});

interface mockAppType {
  children: any;
  localstorage?: any;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

function MockApp({ children, localstorage = {} }: mockAppType) {
  const [modalSuggestion, setModalSuggestion] = useState<modalContextTypeSuggestion>({
    active: false,
  });
  const [modalMessage, setModalMessage] = useState<modalMessageTypeContext>({
    message: { msg: '', type: 'success' },
    active: false,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ContextThemeProvider>
        <LocalStorageMock items={localstorage}>
          <ContextModalSuggestion.Provider value={{ modalSuggestion, setModalSuggestion }}>
            <ContextModalMessage.Provider value={{ modalMessage, setModalMessage }}>
              <ContextFilters.Provider value={{ tags, filters, setFilters, setTags }}>
                {children}
              </ContextFilters.Provider>
            </ContextModalMessage.Provider>
          </ContextModalSuggestion.Provider>
        </LocalStorageMock>
      </ContextThemeProvider>
    </QueryClientProvider>
  );
}

export default MockApp;
