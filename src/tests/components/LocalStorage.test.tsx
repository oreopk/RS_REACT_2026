import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import { type Book } from '../../types/book';
import { BrowserRouter } from 'react-router-dom';

const mockFetch = () =>
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ numFound: 1, docs: [] as Book[] }),
    })
  );

describe('localStorage', () => {
  it('saved search from localStorage', async () => {
    localStorage.setItem('savedSearch', 'harry');
    vi.stubGlobal('fetch', mockFetch());

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('harry');
    });

    localStorage.clear();
  });

  it('writes to localStoraged', async () => {
    vi.stubGlobal('fetch', mockFetch());

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'hobbit' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(localStorage.getItem('savedSearch')).toBe('hobbit');
    });

    localStorage.clear();
  });
});
