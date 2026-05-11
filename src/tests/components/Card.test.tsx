import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Card from '../../components/Card';
import type { Book } from '../../types/book';

describe('Card', () => {
  it('should render book with data', () => {
    const mockBook: Book = {
      key: '/works/OL23286W',
      title: 'The Last Kingdom',
      author_name: ['Bernard Cornwell'],
      first_publish_year: 2004,
      subtitle: 'a novel',
    };

    render(<Card book={mockBook} />);

    expect(screen.getByText('The Last Kingdom')).toBeInTheDocument();
    expect(screen.getByText(/Bernard Cornwell/)).toBeInTheDocument();
    expect(screen.getByText(/2004/)).toBeInTheDocument();
    expect(screen.getByText('a novel')).toBeInTheDocument();
  });

  it('loads card description', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ description: 'description' }),
        })
      )
    );

    const mockBook: Book = {
      key: '/works/OL23286W',
      title: 'The Last Kingdom',
      author_name: ['Bernard Cornwell'],
      first_publish_year: 2004,
      subtitle: 'a novel',
    };

    render(<Card book={mockBook} />);

    await waitFor(() => {
      expect(screen.getByText('description')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
