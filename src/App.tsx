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

  render() {
    return (
      <div>
        <div>
          <input />
          <button onClick={this.fetch}>Search</button>
        </div>
        <div>
          {this.state.cards.map((book) => (
            <div key={book.key}>
              <span>{book.title}</span>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
