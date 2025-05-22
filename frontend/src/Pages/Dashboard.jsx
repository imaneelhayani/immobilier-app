import React, { useEffect } from 'react';
import '../Styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
     
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <svg width="24" height="24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <h2>Real Estate Admin</h2>
          </div>

          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="#" className="nav-link active">Vue d'ensemble</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Propriétés</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Clients</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Transactions</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Rapports</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Calendrier</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Paramètres</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="header">
            <h1>Tableau de Bord</h1>
            <div className="header-actions">
              <button className="notification-btn">🔔</button>
              <button className="profile-btn">👤</button>
              <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
            </div>
          </header>

          {/* Content */}
          <div className="content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">Total Propriétés</div>
                  <div className="stat-icon">🏠</div>
                </div>
                <div className="stat-value">142</div>
                <div className="stat-change">+12% ce mois</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">Clients Actifs</div>
                  <div className="stat-icon">👥</div>
                </div>
                <div className="stat-value">89</div>
                <div className="stat-change">+8% ce mois</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">Ventes ce Mois</div>
                  <div className="stat-icon">💰</div>
                </div>
                <div className="stat-value">23</div>
                <div className="stat-change">+15% ce mois</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">Revenus Totaux</div>
                  <div className="stat-icon">📈</div>
                </div>
                <div className="stat-value">120K MAD</div>
                <div className="stat-change">+20% ce mois</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
