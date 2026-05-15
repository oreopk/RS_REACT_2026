import Card from './Card';
import type { Book } from '../types/book';

type CardListProps = {
  books: Book[];
};

function CardList({ books }: CardListProps) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <Card key={book.key} book={book} />
      ))}
    </div>
  );
}

export default CardList;
