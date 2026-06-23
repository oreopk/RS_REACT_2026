'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/context/ThemeProvider';
import ErrorBoundary from './ErrorBoundary';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}