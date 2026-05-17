import { useState } from 'react';

function useLocalStorage(key: string, initValue: string): [string, (newValue: string) => void] {
  const [value, setValue] = useState<string>(() => localStorage.getItem(key) ?? initValue);

  const setLocalStorageValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}

export default useLocalStorage;
