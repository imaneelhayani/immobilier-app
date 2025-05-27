import React, { useEffect, useState } from 'react';
import '../Styles/Clients.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Clients() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(9);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const navigate = useNavigate();

  const [clients, setClients] = useState([
    {
      id: 1,
      nom: 'Ahmed Bennani',
      email: 'ahmed.bennani@email.com',
      telephone: '+212 6 12 34 56 78',
      dateInscription: '2024-01-15',
      statut: 'active',
      nombreProprietes: 3,
      valeurPortfolio: '2.5M MAD',
      dernierContact: '2024-05-20'
    },
    {
      id: 2,
      nom: 'Fatima Alaoui',
      email: 'fatima.alaoui@email.com',
      telephone: '+212 6 87 65 43 21',
      dateInscription: '2024-02-10',
      statut: 'active',
      nombreProprietes: 1,
      valeurPortfolio: '850K MAD',
      dernierContact: '2024-05-22'
    },
    {
      id: 3,
      nom: 'Omar Chakib',
      email: 'omar.chakib@email.com',
      telephone: '+212 6 55 44 33 22',
      dateInscription: '2024-03-05',
      statut: 'pending',
      nombreProprietes: 0,
      valeurPortfolio: '0 MAD',
      dernierContact: '2024-05-18'
    },
    {
      id: 4,
      nom: 'Laila Berrada',
      email: 'laila.berrada@email.com',
      telephone: '+212 6 99 88 77 66',
      dateInscription: '2024-01-30',
      statut: 'inactive',
      nombreProprietes: 2,
      valeurPortfolio: '1.8M MAD',
      dernierContact: '2024-04-15'
    },
    {
      id: 5,
      nom: 'Youssef Amrani',
      email: 'youssef.amrani@email.com',
      telephone: '+212 6 11 22 33 44',
      dateInscription: '2024-04-12',
      statut: 'active',
      nombreProprietes: 4,
      valeurPortfolio: '3.2M MAD',
      dernierContact: '2024-05-23'
    },
    {
      id: 6,
      nom: 'Aicha Fassi',
      email: 'aicha.fassi@email.com',
      telephone: '+212 6 77 88 99 00',
      dateInscription: '2024-02-28',
      statut: 'active',
      nombreProprietes: 1,
      valeurPortfolio: '1.1M MAD',
      dernierContact: '2024-05-21'
    }
  ]);

  useEffect(() => {
    console.log("Vérification de l'authentification...");
  }, []);

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitials = (nom) => {
    return nom.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return 'status-active';
    }
  };

  const getStatusText = (statut) => {
    switch (statut) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'pending': return 'En attente';
      default: return 'Actif';
    }
  };

  return (
    <div className="clients-container">
      <aside className="sidebar">
        <div className="logo">
          <svg width="24" height="24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <h2>Real Estate Admin</h2>
        </div>
        <nav>
          <ul className="nav-menu">
                      <li className="nav-item"><a href="#" className="nav-link active">Vue d'ensemble</a></li>
                      <li className="nav-item"><Link to="/Proprietes" className="nav-link">Propriétés</Link></li>
                      <li className="nav-item"><Link to="/Clients" className="nav-link">Clients</Link></li>
                      <li className="nav-item"><Link to="/Transactions" className="nav-link">Transactions</Link></li>
                      <li className="nav-item"><a href="#" className="nav-link">Rapports</a></li>
                      <li className="nav-item"><a href="#" className="nav-link">Calendrier</a></li>
                      <li className="nav-item"><a href="#" className="nav-link">Paramètres</a></li>
                    </ul>
        </nav>
      </aside>

      <main className="clients-main-content">
        <header className="clients-header">
          <h1 className="clients-title">Gestion des Clients</h1>
          <div className="clients-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
            <button className="add-client-btn" onClick={() => setShowModal(true)}>
              ➕ Nouveau Client
            </button>
          </div>
        </header>

        <div className="search-export-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">📊 Filtres</button>
          <button className="export-btn">📥 Exporter</button>
        </div>

        <div className="table-header">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⚏ Grille
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              ☰ Tableau
            </button>
          </div>
        </div>

        {/* Vue Grille */}
        {viewMode === 'grid' && (
          <div className="clients-grid">
            {currentClients.map((client) => (
              <div key={client.id} className="client-card">
                <div className="client-header">
                  <div className="client-avatar">
                    {getInitials(client.nom)}
                  </div>
                  <div className="client-info">
                    <h3>{client.nom}</h3>
                    <p className="client-email">{client.email}</p>
                  </div>
                </div>
                <div className="client-details">
                  <div className="detail-item">
                    <span className="detail-label">Téléphone</span>
                    <span className="detail-value">{client.telephone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Statut</span>
                    <span className={`client-status ${getStatusColor(client.statut)}`}>
                      ● {getStatusText(client.statut)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Propriétés</span>
                    <span className="detail-value">{client.nombreProprietes}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Portfolio</span>
                    <span className="detail-value">{client.valeurPortfolio}</span>
                  </div>
                </div>
                <div className="client-actions">
                  <button className="action-btn">👁️ Voir</button>
                  <button className="action-btn">✏️ Modifier</button>
                  <button className="action-btn primary">📞 Contacter</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vue Tableau */}
        {viewMode === 'table' && (
          <div className="clients-table-view">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Téléphone</th>
                  <th>Statut</th>
                  <th>Propriétés</th>
                  <th>Portfolio</th>
                  <th>Dernier Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="table-client-info">
                        <div className="table-avatar">{getInitials(client.nom)}</div>
                        <div className="table-client-details">
                          <h4>{client.nom}</h4>
                          <p>{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{client.telephone}</td>
                    <td>
                      <span className={`client-status ${getStatusColor(client.statut)}`}>
                        ● {getStatusText(client.statut)}
                      </span>
                    </td>
                    <td>{client.nombreProprietes}</td>
                    <td>{client.valeurPortfolio}</td>
                    <td>{new Date(client.dernierContact).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <div className="client-actions">
                        <button className="action-btn">👁️</button>
                        <button className="action-btn">✏️</button>
                        <button className="action-btn primary">📞</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* État vide */}
        {filteredClients.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h2 className="empty-title">Aucun client trouvé</h2>
            <p className="empty-description">
              {searchTerm ? 'Aucun client ne correspond à votre recherche.' : 'Commencez par ajouter votre premier client.'}
            </p>
            <button className="add-client-btn" onClick={() => setShowModal(true)}>
              ➕ Ajouter un Client
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Précédent
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Suivant →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Clients;
