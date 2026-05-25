import { describe, it, expect } from 'vitest';
import reducer, { addItem, removeItem, clearAllBook } from '../../store/slice';
import type { Book } from '../../types/book';

const book1: Book = { key: '/works/OL23286W', title: 'Book One' };
const book2: Book = { key: '/works/OL232862', title: 'Book Two' };

describe('selectedSlice', () => {
  it('add items', () => {
    const state = reducer({ items: [] }, addItem(book1));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(book1);
  });

  it('remove item', () => {
    const state = reducer({ items: [book1, book2] }, removeItem('/works/OL23286W'));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(book2);
  });

  it('clears all items', () => {
    const state = reducer({ items: [book1, book2] }, clearAllBook());
    expect(state.items).toEqual([]);
  });
});
