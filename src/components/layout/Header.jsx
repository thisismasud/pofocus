import { History, Moon, Sun, Timer } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo-container">
        <Timer size={24} color="var(--primary-color)" />
        <h1 className="title">PoFocus</h1>
      </div>

      <nav className="nav">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <Timer size={20} />
          <span className="nav-text">Timer</span>
        </Link>
        <Link 
          to="/history" 
          className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
        >
          <History size={20} />
          <span className="nav-text">History</span>
        </Link>
      </nav>

      <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
};

export default Header;
