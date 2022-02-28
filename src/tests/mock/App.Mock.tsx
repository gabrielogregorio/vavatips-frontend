import { ReactNode, useMemo, useState } from 'react';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { modalContextTypeSuggestion, modalMessageTypeContext } from '@/interfaces/modal';
import { LocalStorageMock } from '@react-mock/localstorage';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { ContextThemeProvider } from '@/contexts/theme';

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

interface MockAppInterface {
  children: ReactNode;
  localstorage?: { [key: string]: string };
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const MockApp = ({ children, localstorage }: MockAppInterface) => {
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
    <QueryClientProvider client={queryClient}>
      <ContextThemeProvider>
        <LocalStorageMock items={localstorage}>
          <ContextModalSuggestion.Provider value={valueModalSuggestion}>
            <ContextModalMessage.Provider value={valueModalMessage}>
              <ContextFilters.Provider value={valueFilters}>{children}</ContextFilters.Provider>
            </ContextModalMessage.Provider>
          </ContextModalSuggestion.Provider>
        </LocalStorageMock>
      </ContextThemeProvider>
    </QueryClientProvider>
  );
};

export default MockApp;

MockApp.defaultProps = {
  localstorage: {},
};
