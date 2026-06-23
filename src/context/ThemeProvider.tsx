'use client';

import { type ReactNode } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';
import useLocalStorage from '@/hooks/useLocalStorage';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme: theme as Theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
