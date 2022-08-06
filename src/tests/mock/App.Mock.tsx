import { ReactNode, useMemo, useState } from 'react';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { IModalContextSuggestion, modalMessageTypeContext } from '@/types/modal';
import { LocalStorageMock } from '@react-mock/localstorage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContextThemeProvider } from '@/contexts/theme';

type mockType = {
  children: ReactNode;
  localstorage?: { [key: string]: string };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
    },
  },
});

export const MockApp = ({ children, localstorage }: mockType) => {
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

MockApp.defaultProps = {
  localstorage: {},
};
