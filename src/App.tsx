import './App.css';
import React from 'react';
import LoadingSpinner from './components/LoadingSpinner';

type Book = {
  key: string;
  title: string;
  cover_i?: number;
  description?: string;
  author_name?: string;
};

class App extends React.Component {
  state: { cards: Book[]; searchWords: string; oldSearchWords: string } = {
    oldSearchWords: '',
    searchWords: '',
    cards: [],
  };

  fetch = () => {
    const query = this.state.searchWords.trim();
    const search = query || 'aaa';
    localStorage.setItem('savedSearch', query);
    if (query != this.state.oldSearchWords || this.state.oldSearchWords === '') {
      this.setState({ cards: [], searchWords: query, oldSearchWords: query });
      fetch(`https://openlibrary.org/search.json?q=${search}&page=1&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ cards: data.docs || [] });
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
    return (
      <div className="page-wrapper">
        <div className="search">
          <input
            value={this.state.searchWords}
            onChange={(e) => this.setState({ searchWords: e.target.value })}
          />
          <button onClick={this.fetch}>Search</button>
        </div>
        {this.state.cards.length == 0 ? (
          <LoadingSpinner />
        ) : (
          <div className="books-grid">
            {this.state.cards.map((book) => (
              <div className="card" key={book.key}>
                <div className="card__cover">
                  <img
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : '/default.jpg'
                    }
                    alt={book.title}
                  />
                </div>
                <div className="card__cover-info">
                  <span>{book.title}</span>
                  <p>Author: {book.author_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
