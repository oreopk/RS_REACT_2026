import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';
import App from '../../App';
import { type Book } from '../../types/book';
import { BrowserRouter } from 'react-router-dom';

describe('ErrorBoundary', () => {
  it('shows fallback UI ERROR', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ numFound: 1, docs: [] as Book[] }),
        })
      )
    );

    render(
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByText('TEST ERROR'));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it('resets error', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ numFound: 1, docs: [] as Book[] }),
        })
      )
    );

    render(
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('TEST ERROR'));
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reload app'));
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
