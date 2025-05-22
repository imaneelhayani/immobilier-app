import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';
//import logo from '../assets/logo.svg'; // Assurez-vous d'avoir ce fichier dans votre dossier assets <img src={logo} alt="Logo du site" className="site-logo" />

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            <Link to="/login" className="btn btn-login">Connexion</Link>
            <Link to="/register" className="btn btn-register">Inscription</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}