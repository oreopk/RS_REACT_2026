import React from 'react';

type SearchProps = {
  searchWords: string;
  onSearchChange: (value: string) => void;
  fetch: () => void;
};

class Search extends React.Component<SearchProps> {
  render() {
    return (
      <div className="search">
        <input
          value={this.props.searchWords}
          onChange={(e) => this.props.onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') this.props.fetch();
          }}
        />
        <button onClick={this.props.fetch}>Search</button>
      </div>
    );
  }
}

export default Search;
