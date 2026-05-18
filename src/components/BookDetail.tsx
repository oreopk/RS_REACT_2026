import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import type { Book, DetailResponse } from '../types/book';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book | null>(null);
  const location = useLocation();
  const firstPublishYear = location.state?.first_publish_year;
  const authorName = location.state?.author_name;

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((res) => res.json())
      .then((data: DetailResponse) => {
        setBook({
          title: data.title,
          cover_i: data.covers?.[0],
          description:
            typeof data.description === 'string'
              ? data.description
              : data.description?.value || 'No description',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <div className="book-detail">
      <button
        className="black_btn"
        onClick={() => {
          navigate(`/?${searchParams.toString()}`);
        }}
      >
        Close
      </button>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {book?.cover_i && (
            <img
              className="book-detail__cover"
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
            />
          )}
          <h2>{book?.title}</h2>
          {authorName && (
            <p>
              <strong>Author:</strong> {authorName.join(', ')}
            </p>
          )}
          {firstPublishYear && (
            <p>
              <strong>Year:</strong> {firstPublishYear}
            </p>
          )}
          {book?.description && (
            <p className="card__desc" dangerouslySetInnerHTML={{ __html: book?.description }} />
          )}
        </>
      )}
    </div>
  );
}

export default BookDetail;
