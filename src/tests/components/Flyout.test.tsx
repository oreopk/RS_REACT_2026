import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Flyout from '../../components/Flyout';
import selectedReducer, { addItem } from '../../store/slice';
import type { Book } from '../../types/book';

const books: Book[] = [
  { key: '1', title: 'Book1' },
  { key: '2', title: 'Book2' },
];

function setupStore(items: Book[] = []) {
  const store = configureStore({ reducer: { selected: selectedReducer } });
  items.forEach((book) => store.dispatch(addItem(book)));
  return store;
}

describe('Flyout', () => {
  it('shows selected items count', () => {
    const store = setupStore(books);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText('Selected Books: 2')).toBeInTheDocument();
  });

  it('shows zero selected', () => {
    const store = setupStore([]);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText('Selected Books: 0')).toBeInTheDocument();
  });

  it('Clear All button click', async () => {
    const user = userEvent.setup();
    const store = setupStore(books);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    await user.click(screen.getByRole('button', { name: /clear all/i }));
    expect(store.getState().selected.items).toEqual([]);
  });
});
