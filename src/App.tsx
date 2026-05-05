import './App.css';
import React from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Search from './components/Search';
import CardList from './components/CardList';
import type { Book } from './types/book';

class App extends React.Component {
  state: {
    cards: Book[];
    searchWords: string;
    oldSearchWords: string | null;
    error: string | null;
    loading: boolean;
    errorReact: boolean;
  } = {
    oldSearchWords: null,
    searchWords: '',
    cards: [],
    error: null,
    loading: false,
    errorReact: false,
  };

  fetch = () => {
    const query = this.state.searchWords.trim();
    const search = query || 'Kingdom';
    if (query !== this.state.oldSearchWords) {
      localStorage.setItem('savedSearch', query);
      this.setState({
        loading: true,
        error: null,
        cards: [],
        oldSearchWords: query,
      });
      fetch(`https://openlibrary.org/search.json?q=${search}&page=1&limit=10`)
        .then((res) => {
          this.setState({ loading: false });
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
          this.setState({ cards: data.docs || [] });
        })
        .catch((error) => {
          this.setState({ loading: false });
          const errorMessage = error?.message || error || 'Something went wrong';
          this.setState({ error: errorMessage, cards: [] });
        });
    }
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem('savedSearch');
    if (savedSearch) {
      this.setState({ searchWords: savedSearch }, this.fetch);
    } else {
      this.fetch();
    }
  }

  render() {
    if (this.state.errorReact) {
      throw new Error('errorReact');
    }
    return (
      <div className="page-wrapper">
        <button
          className="test-error-btn"
          onClick={() => {
            this.setState({ errorReact: true });
          }}
        >
          TEST ERROR
        </button>
        <section className="search-section">
          <Search
            searchWords={this.state.searchWords}
            onSearchChange={(value) => this.setState({ searchWords: value })}
            fetch={this.fetch}
          />
        </section>
        <section className="results-section">
          {this.state.error && <div>{this.state.error}</div>}
          {this.state.loading ? <LoadingSpinner /> : <CardList books={this.state.cards} />}
        </section>
      </div>
    );
  }
}

export default App;
