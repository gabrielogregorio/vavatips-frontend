/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage } from '@/contexts/modalMessage';
import { ContextModalSuggestion } from '@/contexts/modalSuggestion';
import { modalContextTypeSuggestion, modalMessageTypeContext } from '@/interfaces/modal';
import { LocalStorageMock } from '@react-mock/localstorage';

interface mockAppType {
  children: any;
  localstorage?: any;
}

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
    <LocalStorageMock items={localstorage}>
      <ContextModalSuggestion.Provider value={{ modalSuggestion, setModalSuggestion }}>
        <ContextModalMessage.Provider value={{ modalMessage, setModalMessage }}>
          <ContextFilters.Provider value={{ tags, filters, setFilters, setTags }}>{children}</ContextFilters.Provider>
        </ContextModalMessage.Provider>
      </ContextModalSuggestion.Provider>
    </LocalStorageMock>
  );
}

export default MockApp;
