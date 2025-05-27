// src/Pages/ModifierPropriete.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/dashboard.css';

function ModifierPropriete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    ville: '',
    surface: '',
    prix: '',
    nbr_chambres: '',
    nbr_salles_bain: '',
    etat: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchPropertyData();
    }
  }, [id, navigate]);

  const fetchPropertyData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/immobiliers/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement", error);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/immobiliers/${id}`, formData);
      navigate('/proprietes');
    } catch (error) {
      console.error("Erreur lors de la modification", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer cette propriété ?')) {
      setDeleteLoading(true);
      try {
        await axios.delete(`http://127.0.0.1:8000/api/immobiliers/${id}`);
        navigate('/proprietes');
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
            <li className="nav-item"><Link to="/proprietes" className="nav-link active">Propriétés</Link></li>
            <li className="nav-item"><a href="#" className="nav-link">Clients</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Transactions</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Rapports</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Calendrier</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Paramètres</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <Link to="/proprietes" className="back-btn">
              ← Retour aux propriétés
            </Link>
            <h1>✏️ Modifier la Propriété</h1>
          </div>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>

        {/* Form Content */}
        <div className="content">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Informations de la Propriété</h2>
              <p className="form-subtitle">Modifiez les détails de cette propriété</p>
            </div>

            <form onSubmit={handleSubmit} className="property-form">
              {/* Informations principales */}
              <div className="form-section">
                <h3 className="section-title">📋 Informations Principales</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">Type de Propriété *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Appartement">Appartement</option>
                      <option value="Villa">Villa</option>
                      <option value="Maison">Maison</option>
                      <option value="Bureau">Bureau</option>
                      <option value="Local Commercial">Local Commercial</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Statut *</label>
                    <select
                      name="etat"
                      value={formData.etat}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Choisir statut</option>
                      <option value="Disponible">Disponible</option>
                      <option value="Vendue">Vendue</option>
                      <option value="En Négociation">En Négociation</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Prix (MAD) *</label>
                    <input
                      type="number"
                      name="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: 2500000"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Surface (m²) *</label>
                    <input
                      type="number"
                      name="surface"
                      value={formData.surface}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: 120"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Localisation */}
              <div className="form-section">
                <h3 className="section-title">📍 Localisation</h3>
                <div className="form-grid">
                  <div className="input-group full-width">
                    <label className="input-label">Ville *</label>
                    <select
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Sélectionner une ville</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Fès">Fès</option>
                      <option value="Tanger">Tanger</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Détails */}
              <div className="form-section">
                <h3 className="section-title">🏠 Détails de la Propriété</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">Nombre de Chambres</label>
                    <input
                      type="number"
                      name="nbr_chambres"
                      value={formData.nbr_chambres}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: 3"
                      min="0"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Salles de Bain</label>
                    <input
                      type="number"
                      name="nbr_salles_bain"
                      value={formData.nbr_salles_bain}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: 2"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="form-actions">
                <div className="action-buttons">
                  <Link to="/proprietes" className="cancel-btn">
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    className={`submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? '⏳ Modification...' : '💾 Enregistrer'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className={`delete-btn ${deleteLoading ? 'loading' : ''}`}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? '⏳ Suppression...' : '🗑️ Supprimer'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ModifierPropriete;