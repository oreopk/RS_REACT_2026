'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchBooksQuery } from '@/store/apiSlice';
import { type typeApiError } from '@/types/book';
import LoadingSpinner from './LoadingSpinner';
import CardList from './CardList';

export default function MainList() {
  const searchParams = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isFetching, isError, error } = useSearchBooksQuery({
    searchWords: q,
    page,
  });

  const cards = data?.docs ?? [];
  const errorMessage = isError
    ? ((error as typeApiError).data?.detail?.[0]?.msg ?? 'Something went wrong')
    : null;

  if (isFetching) return <LoadingSpinner />;
  if (errorMessage) return <div>{errorMessage}</div>;
  return <CardList books={cards} />;
}