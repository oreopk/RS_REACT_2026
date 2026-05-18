import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import CardList from '../../components/CardList';
import type { Book } from '../../types/book';
import { BrowserRouter } from 'react-router-dom';

describe('CardList', () => {
  it('renders list books', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }))
    );

    const books: Book[] = [
      { key: '1', title: 'Book1' },
      { key: '2', title: 'Book2' },
    ];

    render(
      <BrowserRouter>
        <CardList books={books} />
      </BrowserRouter>
    );

    expect(screen.getByText('Book1')).toBeInTheDocument();
    expect(screen.getByText('Book2')).toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
