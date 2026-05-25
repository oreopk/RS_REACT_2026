import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';
import type { Book } from '../../types/book';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../../store/slice';

describe('Card', () => {
  const mockBook: Book = {
    key: '/works/OL23286W',
    title: 'The Last Kingdom',
    author_name: ['Bernard Cornwell'],
    first_publish_year: 2004,
    subtitle: 'a novel',
  };

  it('should render book with data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card book={mockBook} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('The Last Kingdom')).toBeInTheDocument();
    expect(screen.getByText(/Bernard Cornwell/)).toBeInTheDocument();
    expect(screen.getByText(/2004/)).toBeInTheDocument();
    expect(screen.getByText('a novel')).toBeInTheDocument();
  });

  it('book in store when checkbox is checked', async () => {
    const user = userEvent.setup();
    const store = configureStore({ reducer: { selected: selectedReducer } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card book={mockBook} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    await user.click(screen.getByRole('checkbox'));

    expect(store.getState().selected.items).toHaveLength(1);
    expect(store.getState().selected.items[0].key).toBe(mockBook.key);
  });
});
