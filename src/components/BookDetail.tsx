'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LoadingSpinner from './LoadingSpinner';
import { useGetBookByIdQuery } from '@/store/apiSlice';
import { type typeApiError } from '@/types/book';

export default function BookDetail() {
  const t = useTranslations('Main');
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data, isFetching, isError, error, refetch } = useGetBookByIdQuery(id ?? '', {
    skip: !id,
  });

  let book: { title: string; cover_i?: number; description: string } | null = null;
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

  const close = () => {
    const qs = searchParams.toString();
    router.push(`/${qs ? `?${qs}` : ''}`);
  };

  return (
    <div className="book-detail">
      <div className="book-detail__buttons">
        <button className="black_btn" onClick={() => refetch()}>
          {t('refresh')}
        </button>
        <button className="black_btn" onClick={close}>
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
          <h2>{book.title}</h2>
          {book.description && (
            <p className="card__desc" dangerouslySetInnerHTML={{ __html: book.description }} />
          )}
        </div>
      )}
    </div>
  );
}