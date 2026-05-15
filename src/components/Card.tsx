import { useState, useEffect } from 'react';
import type { Book } from '../types/book';

type CardProps = { book: Book };

function Card(props: CardProps) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`https://openlibrary.org${props.book.key}.json`)
      .then((res) => res.json())
      .then((data) => {
        setDescription(
          (typeof data.description === 'string'
            ? data.description
            : data.description?.value || ''
          ).slice(0, 150)
        );
      })
      .catch(() => {
        setDescription('Error loading description');
      });
  }, [props.book.key]);

  const { book } = props;
  return (
    <div className="card">
      <div className="card__cover">
        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : '/default.jpg'
          }
          alt={book.title}
        />
      </div>
      <div className="card__cover-info">
        <h3 className="card__title">{book.title}</h3>
        <p>
          <strong>Author:</strong> {book.author_name?.join(', ') || 'Unknown'}
        </p>
        {book.first_publish_year && (
          <p>
            <strong>Year:</strong> {book.first_publish_year || 'Unknown'}
          </p>
        )}
        {book.subtitle && <p>{book.subtitle}</p>}
        {description && (
          <p className="card__desc" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>
    </div>
  );
}

export default Card;
