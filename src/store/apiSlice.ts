import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchResponse, DetailResponse } from '../types/book';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://openlibrary.org/';
const TTL_CACHE = Number(process.env.NEXT_PUBLIC_TTL_CACHE) || 60;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: TTL_CACHE,
  endpoints: (builder) => ({
    searchBooks: builder.query<SearchResponse, { searchWords: string; page: number }>({
      query: (args) => {
        const search = args.searchWords.trim() || 'Kingdom';
        return `search.json?q=${search}&page=${args.page}&limit=10`;
      },
    }),
    getBookById: builder.query<DetailResponse, string>({
      query: (id) => `works/${id}.json`,
    }),
  }),
});

export const { useSearchBooksQuery, useGetBookByIdQuery } = apiSlice;
