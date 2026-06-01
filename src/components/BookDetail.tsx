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
  const [fetchedId, setFetchedId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://openlibrary.org/works/${id}.json`, { signal: controller.signal })
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
        setFetchedId(id ?? null);
        setImageLoaded(false);
      })
      .catch(() => {
        setLoading(false);
        setFetchedId(id ?? null);
      });
  }, [id]);

  const dataLoading = loading || fetchedId !== id;

  return (
    <div className="book-detail">
      <button className="black_btn" onClick={() => navigate(`/?${searchParams.toString()}`)}>
        Close
      </button>
      {dataLoading && <LoadingSpinner />}
      {!dataLoading && book && (
        <div className="book-detail__content">
          {book.cover_i && !imageLoaded && <LoadingSpinner />}
          {book.cover_i && (
            <img
              className="book-detail__cover"
              style={{ display: imageLoaded ? 'block' : 'none' }}
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
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
        </div>
      )}
    </div>
  );
}

export default BookDetail;
