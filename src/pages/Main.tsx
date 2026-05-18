import useLocalStorage from '../hooks/useLocalStorage';
import { useState, useEffect, useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Search from '../components/Search';
import CardList from '../components/CardList';
import { useSearchParams } from 'react-router-dom';
import type { Book } from '../types/book';

function MainPage() {
  const [cards, setCards] = useState<Book[]>([]);
  const [searchWords, setSearchWords] = useLocalStorage('savedSearch', '');
  const oldSearchWords = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState<number>(0);
  const prevPage = useRef<number>(page);

  const abortController = useRef<AbortController | null>(null);

  const fetchBooks = (searchWords: string, pageNum: number = 1) => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    const query = searchWords.trim();
    const search = query || 'Kingdom';
    const pageChanged = prevPage.current !== pageNum;
    if (pageChanged || query !== oldSearchWords.current) {
      setSearchWords(query);
      setLoading(true);
      setError(null);
      setCards([]);
      oldSearchWords.current = query;
    }
    fetch(`https://openlibrary.org/search.json?q=${search}&page=${pageNum}&limit=10`, {
      signal: abortController.current.signal,
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) {
          return res.json().then((data) => {
            if (data.detail) {
              throw data.detail?.[0]?.msg;
            } else {
              throw 'unknown error';
            }
          });
        }

        return res.json();
      })
      .then((data) => {
        if (data.numFound === 0) {
          throw 'Nothing was found';
        }
        setCards(data.docs || []);
        setTotalPages(Math.ceil(data.numFound / 10));
      })
      .catch((error) => {
        console.log(error);
        if (error.name === 'AbortError') return;
        setLoading(false);
        const errorMessage = error?.message || error || 'Something went wrong';
        setError(errorMessage);
        setCards([]);
      });
  };

  useEffect(() => {
    fetchBooks(searchWords, page);
  }, [page]);

  return (
    <>
      <div className="page-wrapper">
        {totalPages > 0 && (
          <div className="pagination">
            <button
              disabled={page <= 1}
              onClick={() => setSearchParams({ page: String(page - 1) })}
            >
              Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setSearchParams({ page: String(page + 1) })}
            >
              Next
            </button>
          </div>
        )}
        <section className="search-section">
          <Search
            searchWords={searchWords}
            onSearchChange={(value) => setSearchWords(value)}
            fetch={() => {
              fetchBooks(searchWords, 1);
              setSearchParams({ page: '1' });
            }}
          />
        </section>
        <section className="results-section">
          {error && <div>{error}</div>}
          {loading ? <LoadingSpinner /> : <CardList books={cards} />}
        </section>
      </div>
    </>
  );
}

export default MainPage;
