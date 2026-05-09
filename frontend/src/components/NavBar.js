import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

  return (
    <nav className="navbar custom-navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🗞️ NewsMonkey
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {categories.map((cat) => (
              <li className="nav-item" key={cat}>
                <Link className="nav-link" to={`/${cat.toLowerCase()}`}>{cat}</Link>
              </li>
            ))}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/saved">
                  🔖 Bookmarks
                </Link>
              </li>
            )}
          </ul>

          {/* Search Form */}
          <form className="d-flex me-2 search-container" onSubmit={handleSearch}>
            <input
              className="form-control form-control-sm search-pill"
              type="search"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-icon-btn" type="submit" title="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </form>

          {/* Auth and Theme */}
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleTheme}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#1a1a1a',
                border: '1px solid #27272a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease',
                color: '#fff',
                padding: 0,
                marginRight: '4px'
              }}
              title="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/profile" className="nav-user-pill text-decoration-none">
                  👤 {user.name.split(' ')[0]}
                </Link>
                <button className="nav-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="nav-login-btn">Login</Link>
                <Link to="/register" className="nav-register-btn">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
