import React, { useEffect, useState } from 'react';
import '../Styles/dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Proprietes() {
  const navigate = useNavigate();

  const [totalProperties, setTotalProperties] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [vendue, setVendue] = useState(0);
  const [enNegociation, setEnNegociation] = useState(0);

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
      setDisponible(response.data.disponible);
      setVendue(response.data.vendue);
      setEnNegociation(response.data.en_negociation);
    } catch (error) {
      console.error("Erreur lors du chargement des propriétés", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };
const [immobiliers, setImmobiliers] = useState([]);

useEffect(() => {
  fetchTotalProperties();
  fetchImmobiliers();
}, []);

const fetchImmobiliers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/immobiliers');
    setImmobiliers(response.data);
  } catch (error) {
    console.error("Erreur lors du chargement des propriétés", error);
  }
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
          <h1>🏠 Propriétés</h1>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>

        <div className="content">
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-number">{totalProperties}</div>
              <div className="stat-label">Total Propriétés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{disponible}</div>
              <div className="stat-label">Disponibles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{vendue}</div>
              <div className="stat-label">Vendues</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{enNegociation}</div>
              <div className="stat-label">En Négociation</div>
            </div>
          </div>

          <div className="filters-section">
            <h3 className="filters-title">Recherche et Filtres</h3>

            <div className="search-add-container">
              <div className="search-container">
                <input type="text" className="search-input" placeholder="Rechercher une propriété..." />
                <span className="search-icon">🔍</span>
              </div>
              <Link to="/AjouterPropriete" className="add-property-btn">➕ Ajouter Propriété</Link>

            </div>

            <div className="filters-grid">
              {/* Filtres */}
              <div className="filter-group">
                <label className="filter-label">Type de Propriété</label>
                <select className="filter-select">
                  <option value="">Tous les types</option>
                  <option value="appartement">Appartement</option>
                  <option value="villa">Villa</option>
                  <option value="maison">Maison</option>
                  <option value="bureau">Bureau</option>
                  <option value="local">Local Commercial</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Statut</label>
                <select className="filter-select">
                  <option value="">Tous les statuts</option>
                  <option value="available">Disponible</option>
                  <option value="sold">Vendue</option>
                  <option value="negotiating">En négociation</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Prix Min (MAD)</label>
                <input type="number" className="filter-input" placeholder="Ex: 500000" />
              </div>
              <div className="filter-group">
                <label className="filter-label">Prix Max (MAD)</label>
                <input type="number" className="filter-input" placeholder="Ex: 2000000" />
              </div>
              <div className="filter-group">
                <label className="filter-label">Ville</label>
                <select className="filter-select">
                  <option value="">Toutes les villes</option>
                  <option value="casablanca">Casablanca</option>
                  <option value="rabat">Rabat</option>
                  <option value="marrakech">Marrakech</option>
                  <option value="fes">Fès</option>
                  <option value="tanger">Tanger</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Chambres</label>
                <select className="filter-select">
                  <option value="">Toutes</option>
                  <option value="1">1 chambre</option>
                  <option value="2">2 chambres</option>
                  <option value="3">3 chambres</option>
                  <option value="4">4+ chambres</option>
                </select>
              </div>
            </div>
          </div>

          {/* Les cartes des propriétés viendront ici */}
          <div className="properties-section">
            <h2 className="properties-title">Liste des Propriétés</h2>
            <div className="properties-grid">
  {immobiliers.map((immobilier) => (
    <div className="property-card" key={immobilier.id}>
      <div className="property-image">
        🏠
        <span className={`property-status ${immobilier.etat.toLowerCase()}`}>
          {immobilier.etat}
        </span>
      </div>
      <div className="property-content">
        <h3 className="property-title">{immobilier.type}</h3>
        <div className="property-location">📍 {immobilier.ville}</div>
        <div className="property-details">
          <div className="property-detail">
            <div className="property-detail-value">{immobilier.nbr_chambres}</div>
            <div className="property-detail-label">Chambres</div>
          </div>
          <div className="property-detail">
            <div className="property-detail-value">{immobilier.nbr_salles_bain}</div>
            <div className="property-detail-label">Salles de bain</div>
          </div>
          <div className="property-detail">
            <div className="property-detail-value">{immobilier.surface}m²</div>
            <div className="property-detail-label">Surface</div>
          </div>
        </div>
        <div className="property-price">{immobilier.prix.toLocaleString()} MAD</div>
        <div className="property-actions">
          <button className="action-btn">👁️ Voir</button>
          <button className="action-btn" onClick={() => navigate(`/ModifierPropriete/${immobilier.id}`)}>
  ✏️ Modifier
</button>

          <button className="action-btn primary">💼 Gérer</button>
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Proprietes;
