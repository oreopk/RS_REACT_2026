import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import { type Book } from '../../types/book';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('harry');
    });

    localStorage.clear();
  });

  it('writes to localStoraged', async () => {
    vi.stubGlobal('fetch', mockFetch());

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
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
