import type { Book } from '../types/book';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

type CardProps = { book: Book };

function Card(props: CardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const bookId = props.book.key?.replace('/works/', '') ?? '';
  const isActive = id === bookId;
  const { book } = props;
  return (
    <div
      className={`card ${isActive ? 'card--active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        const id = props.book.key?.replace('/works/', '') ?? '';
        navigate(`/books/${id}?${searchParams.toString()}`, {
          state: { first_publish_year: book.first_publish_year, author_name: book.author_name },
        });
      }}
    >
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
      </div>
    </div>
  );
}

export default Card;
