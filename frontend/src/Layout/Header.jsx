import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      if (user && user.role === 'admin') return; // admin ما غاديش يشوف notifications

      try {
        const res = await fetch('http://localhost:8000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        const data = await res.json();
        setNotifications(data);
        const unread = data.filter(n => !n.is_read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Erreur notifications:', err);
      }
    };

    fetchNotifications();
  }, [token, user]);

  // إذا admin، نعرضو فقط العنوان أو شعار بسيط بلا ما نعرضو حتى حاجة أخرى
  if (user && user.role === 'admin') {
    return (
      <header className="site-header">
        <div className="header-container">
          <div className="logo-container">
            <h1 className="site-title">MySite</h1>
          </div>
          {/* تقدر تزيد هنا menu بسيط أو حتى لا */}
        </div>
      </header>
    );
  }

  // باقي الكود للمستخدمين العاديين
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
                <div onClick={() => navigate('/notifications')} className="notification-icon" style={{ cursor: 'pointer', position: 'relative', marginRight: '10px' }}>
                  <span style={{ fontSize: '22px' }}>🔔</span>
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px'
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>

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
