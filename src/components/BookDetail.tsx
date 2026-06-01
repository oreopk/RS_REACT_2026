import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useGetBookByIdQuery } from '../store/apiSlice';
import { type typeApiError } from '../types/book';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const firstPublishYear = location.state?.first_publish_year;
  const authorName = location.state?.author_name;
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data, isFetching, isError, error, refetch } = useGetBookByIdQuery(id ?? '', {
    skip: !id,
  });

  let book = null;
  if (data) {
    book = {
      title: data.title,
      cover_i: data.covers?.[0],
      description:
        typeof data.description === 'string'
          ? data.description
          : data.description?.value || 'No description',
    };
  }

  const errorMessage = isError
    ? ((error as typeApiError).data?.detail?.[0]?.msg ?? 'Something went wrong')
    : null;

  return (
    <div className="book-detail">
      <div className="book-detail__buttons">
        <button className="black_btn" onClick={() => refetch()}>
          Refresh
        </button>
        <button className="black_btn" onClick={() => navigate(`/?${searchParams.toString()}`)}>
          Close
        </button>
      </div>
      {isFetching && <LoadingSpinner />}
      {errorMessage && <div>{errorMessage}</div>}
      {!isFetching && !isError && book && (
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
