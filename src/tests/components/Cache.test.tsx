import { it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import BookDetail from '../../components/BookDetail';

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

it('data cache', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve(new Response(JSON.stringify({ title: 'The Last Kingdom' }))))
  );
  const { unmount } = renderBookDetail();
  await waitFor(() => expect(screen.getByText('The Last Kingdom')).toBeInTheDocument());
  unmount();
  renderBookDetail();
  await waitFor(() => expect(screen.getByText('The Last Kingdom')).toBeInTheDocument());
});
