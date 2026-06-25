'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { Book } from '../types/book';
import { clearAllBook } from '../store/slice';

function Flyout() {
  const dispatch = useDispatch();
  const items = useSelector((state: { selected: { items: Book[] } }) => state.selected.items);

  return (
    <div className={`Flyout ${items.length ? 'visible' : ''}`}>
      <p>Selected Books: {items.length}</p>
      <button onClick={() => dispatch(clearAllBook())}>Clear All Selected</button>
      <form action="/api/csv" method="POST">
        <input type="hidden" name="data" value={JSON.stringify(items)} />
        <button type="submit">Download</button>
      </form>
    </div>
  );
}

export default Flyout;
