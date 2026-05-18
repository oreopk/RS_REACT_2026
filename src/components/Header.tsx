import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

function Header() {
  const [errorReact, setErrorReact] = useState(false);
  if (errorReact) {
    throw new Error('errorReact');
  }
  return (
    <header>
      <div>
        <nav>
          <Link to="/">LIBRARY</Link>
          <Link to="/about">About</Link>
        </nav>
        <button className="test-error-btn" onClick={() => setErrorReact(true)}>
          TEST ERROR
        </button>
      </div>
    </header>
  );
}

export default Header;
