import './App.css';
import React from 'react';

type Book = {
  key: string;
  title: string;
  cover_i?: number;
};

class App extends React.Component {
  state: { cards: Book[] } = {
    cards: [],
  };

  fetch = () => {
    fetch('https://openlibrary.org/search.json?q=aaa&page=1&limit=10')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ cards: data.docs });
      });
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="search">
          <input />
          <button onClick={this.fetch}>Search</button>
        </div>
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
              <span>{book.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
