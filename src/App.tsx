import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Search from './components/Search';
import CardList from './components/CardList';
import type { Book } from './types/book';

function App() {
  const [cards, setCards] = useState<Book[]>([]);
  const [searchWords, setSearchWords] = useLocalStorage('savedSearch', '');
  const oldSearchWords = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorReact, setErrorReact] = useState<boolean>(false);

  const fetchBooks = (searchWords: string) => {
    const query = searchWords.trim();
    const search = query || 'Kingdom';
    if (query !== oldSearchWords.current) {
      setSearchWords(query);
      setLoading(true);
      setError(null);
      setCards([]);
      oldSearchWords.current = query;

      fetch(`https://openlibrary.org/search.json?q=${search}&page=1&limit=10`)
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
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error?.message || error || 'Something went wrong';
          setError(errorMessage);
          setCards([]);
        });
    }
  };

  useEffect(() => {
    fetchBooks(searchWords);
  }, []);

  if (errorReact) {
    throw new Error('errorReact');
  }
  return (
    <div className="page-wrapper">
      <button
        className="test-error-btn"
        onClick={() => {
          setErrorReact(true);
        }}
      >
        TEST ERROR
      </button>
      <section className="search-section">
        <Search
          searchWords={searchWords}
          onSearchChange={(value) => setSearchWords(value)}
          fetch={() => fetchBooks(searchWords)}
        />
      </section>
      <section className="results-section">
        {error && <div>{error}</div>}
        {loading ? <LoadingSpinner /> : <CardList books={cards} />}
      </section>
    </div>
  );
}

export default App;
