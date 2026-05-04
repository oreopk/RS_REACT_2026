import React from 'react';
import type { Book } from '../types/book';

type CardProps = { book: Book };

class Card extends React.Component<CardProps> {
  state = { description: '' };

  componentDidMount() {
    fetch(`https://openlibrary.org${this.props.book.key}.json`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          description: (typeof data.description === 'string'
            ? data.description
            : data.description?.value || ''
          ).slice(0, 150),
        });
      });
  }
  render() {
    const { book } = this.props;
    return (
      <div className="card">
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
          <h3 className="card__title">{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author_name?.join(', ') || 'Unknown'}
          </p>
          {book.first_publish_year && (
            <p>
              <strong>Year:</strong> {book.first_publish_year || 'Unknown'}
            </p>
          )}
          {book.subtitle && <p>{book.subtitle}</p>}
          {this.state.description && (
            <p
              className="card__desc"
              dangerouslySetInnerHTML={{ __html: this.state.description }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Card;
