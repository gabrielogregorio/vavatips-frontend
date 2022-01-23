import { useState } from 'react';
import { ContextFilters } from '@/contexts/filters';
import { ContextModalMessage, modalMessageType } from '@/contexts/modalMessage';
import { ContextModalSuggestion, modalContextType } from '@/contexts/modalSuggestion';

function MockApp({ children }: any) {
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
    <ContextModalSuggestion.Provider value={{ modalSuggestion, setModalSuggestion }}>
      <ContextModalMessage.Provider value={{ modalMessage, setModalMessage }}>
        <ContextFilters.Provider value={{ tags, filters, setFilters, setTags }}>{children}</ContextFilters.Provider>
      </ContextModalMessage.Provider>
    </ContextModalSuggestion.Provider>
  );
}

export default MockApp;
