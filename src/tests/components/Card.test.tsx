import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';
import type { Book } from '../../types/book';
import { BrowserRouter } from 'react-router-dom';

describe('Card', () => {
  it('should render book with data', () => {
    const mockBook: Book = {
      key: '/works/OL23286W',
      title: 'The Last Kingdom',
      author_name: ['Bernard Cornwell'],
      first_publish_year: 2004,
      subtitle: 'a novel',
    };

    render(
      <BrowserRouter>
        <Card book={mockBook} />
      </BrowserRouter>
    );

    expect(screen.getByText('The Last Kingdom')).toBeInTheDocument();
    expect(screen.getByText(/Bernard Cornwell/)).toBeInTheDocument();
    expect(screen.getByText(/2004/)).toBeInTheDocument();
    expect(screen.getByText('a novel')).toBeInTheDocument();
  });
});
