import { handleErrorSuggestion } from '@/handlers/errors';
import { Api } from '@/services/api';
import { suggestionType } from '@/types/suggestions';
import { useEffect, useState } from 'react';

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<suggestionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getSuggestions = async () => {
      setLoading(true);

      try {
        const res = await Api.get(`/suggestions`);
        setSuggestions(res.data);
      } catch (err) {
        setError(handleErrorSuggestion(err));
      } finally {
        setLoading(false);
      }
    };

    getSuggestions();
  }, []);

  return {
    error,
    loading,
    suggestions,
  };
};
