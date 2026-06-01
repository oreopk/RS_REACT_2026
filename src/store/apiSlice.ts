import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://openlibrary.org/';
const TTL_CACHE = import.meta.env.VITE_TTL_CACHE || 60;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: TTL_CACHE,
  endpoints: (builder) => ({
    searchBooks: builder.query({
      query: (args) => {
        const search = args.searchWords.trim() || 'Kingdom';
        return `search.json?q=${search}&page=${args.page}&limit=10`;
      },
    }),
  }),
});

export const { useSearchBooksQuery } = apiSlice;
