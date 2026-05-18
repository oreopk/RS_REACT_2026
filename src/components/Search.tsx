type SearchProps = {
  searchWords: string;
  onSearchChange: (value: string) => void;
  fetch: () => void;
};

function Search(props: SearchProps) {
  return (
    <div className="search">
      <input
        value={props.searchWords}
        onChange={(e) => props.onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') props.fetch();
        }}
      />
      <button className="black_btn" onClick={props.fetch}>
        Search
      </button>
    </div>
  );
}

export default Search;
