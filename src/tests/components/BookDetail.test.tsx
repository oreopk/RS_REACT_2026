import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { apiSlice } from '../../store/apiSlice';
import BookDetail from '../../components/BookDetail';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

function renderBookDetail() {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/books/OL23286W']}>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('BookDetail', () => {
  beforeEach(() => {
    store.dispatch(apiSlice.util.resetApiState());
  });

  it('showing loading spinner', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );

    renderBookDetail();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('');

    vi.unstubAllGlobals();
  });

  it('shows book title', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(JSON.stringify({ title: 'The Last Kingdom' }))))
    );

    renderBookDetail();

    await waitFor(() => {
      expect(screen.getByText('The Last Kingdom')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
