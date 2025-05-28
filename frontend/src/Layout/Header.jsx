import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // تحقق واش المستخدم مسجل الدخول
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-container">
          <h1 className="site-title">MySite</h1>
        </div>

        <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Menu principal">
          <span className={`hamburger ${isOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`main-navigation ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Accueil</Link></li>
            <li><Link to="/about" className="nav-link">À propos</Link></li>
            <li><Link to="/services" className="nav-link">Services</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>

          <div className="auth-buttons">
            {token ? (
              <>
                <button onClick={() => navigate('/profile')} className="btn btn-profile">
                  Profile
                </button>
                <button onClick={handleLogout} className="btn btn-logout">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-login">Connexion</Link>
                <Link to="/register" className="btn btn-register">Inscription</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
