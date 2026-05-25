import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Header.css';

function Header() {
  const [errorReact, setErrorReact] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        <button onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
        <button className="test-error-btn" onClick={() => setErrorReact(true)}>
          TEST ERROR
        </button>
      </div>
    </header>
  );
}

export default Header;
