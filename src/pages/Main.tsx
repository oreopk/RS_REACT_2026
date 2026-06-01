import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Search from '../components/Search';
import CardList from '../components/CardList';
import { useSearchParams, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSearchBooksQuery } from '../store/apiSlice';
import { type typeApiError } from '../types/book';

function MainPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchWords, setSearchWords] = useLocalStorage('savedSearch', '');

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isFetching, isError, error, refetch } = useSearchBooksQuery({
    searchWords: searchWords,
    page,
  });
  const cards = data?.docs ?? [];
  const totalPages = data ? Math.ceil(data.numFound / 10) : 0;

  const errorMessage = isError
    ? ((error as typeApiError).data?.detail?.[0]?.msg ?? 'Something went wrong')
    : null;

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, []);

  return (
    <>
      <div className="page-wrapper">
        {totalPages > 0 && (
          <div className="pagination">
            <button className="black_btn" onClick={() => refetch()}>
              Refresh
            </button>
            <button
              className="black_btn"
              disabled={page <= 1}
              onClick={() => setSearchParams({ page: String(page - 1) })}
            >
              Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              className="black_btn"
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
              setSearchParams({ page: '1' });
            }}
          />
        </section>
        <div className="main-content">
          <section
            onClick={() => {
              if (id) navigate(`/?${searchParams.toString()}`);
            }}
            className="results-section"
          >
            {errorMessage && <div>{errorMessage}</div>}
            {isFetching ? <LoadingSpinner /> : <CardList books={cards} />}
          </section>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainPage;
