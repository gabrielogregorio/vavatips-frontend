import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string, defaultValueInServer: string) {
  const [valueLocalStorage, setValueLocalStorage] = useState<string>(
    JSON.stringify(defaultValueInServer),
  );

  useEffect(() => {
    setValueLocalStorage(localStorage.getItem(key));
  }, [key]);

  function setLocalStorage(keyLocalStorage: string, value: any) {
    localStorage.setItem(keyLocalStorage, JSON.stringify(value));
  }

  function removeItem(keyLocalStorage: string) {
    localStorage.removeItem(keyLocalStorage);
  }

  return { valueLocalStorage, setLocalStorage, removeItem };
}
