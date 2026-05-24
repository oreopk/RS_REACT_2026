import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Book } from '../types/book';

const initialState: { items: Book[] } = {
  items: [],
};

const selectedSlice = createSlice({
  name: 'selectedBook',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Book>) => {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((book) => book.key !== action.payload);
    },
  },
});

export const { addItem, removeItem } = selectedSlice.actions;
export default selectedSlice.reducer;
