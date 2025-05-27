import React, { useEffect, useState } from 'react';
import '../Styles/dashboard.css';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchTotalProperties();
    }
  }, [navigate]);

  const fetchTotalProperties = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/properties/total');
      setTotalProperties(response.data.total);
    } catch (error) {
      console.error("Erreur lors du chargement des propriétés", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <svg width="24" height="24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <h2>Real Estate Admin</h2>
        </div>
        <nav>
          <ul className="nav-menu">
                                <li className="nav-item"><Link to="/dashboard" className="nav-link">Vue d'ensemble</Link></li>
                                <li className="nav-item"><Link to="/Proprietes" className="nav-link">Propriétés</Link></li>
                                <li className="nav-item"><Link to="/Clients" className="nav-link">Clients</Link></li>
                                <li className="nav-item"><Link to="/Transactions" className="nav-link">Transactions</Link></li>
                                <li className="nav-item"><a href="#" className="nav-link">Rapports</a></li>
                                <li className="nav-item"><a href="#" className="nav-link">Calendrier</a></li>
                                <li className="nav-item"><a href="#" className="nav-link">Paramètres</a></li>
                              </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Tableau de Bord</h1>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>

        <div className="content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">Total Propriétés</div>
                <div className="stat-icon">🏠</div>
              </div>
              <div className="stat-value">{totalProperties}</div>
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
  );
}

export default Dashboard;
