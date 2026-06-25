'use client';

import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initValue: string): [string, (newValue: string) => void] {
  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== null) setValue(saved);
  }, [key]);

  const setLocalStorageValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}

export default useLocalStorage;
