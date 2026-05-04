import React from 'react';
import Card from './Card';
import type { Book } from '../types/book';

type CardListProps = {
  books: Book[];
};

class CardList extends React.Component<CardListProps> {
  render() {
    const { books } = this.props;
    return (
      <div className="books-grid">
        {books.map((book) => (
          <Card key={book.key} book={book} />
        ))}
      </div>
    );
  }
}

export default CardList;
