import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';
import App from '../../App';
import { type Book } from '../../types/book';

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
        <App />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByText('TEST ERROR'));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
