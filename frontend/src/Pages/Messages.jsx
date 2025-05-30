import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/contact', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error("Erreur lors du chargement des messages :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const confirmDelete = (id) => {
    setSelectedMessageId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/contact/${selectedMessageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessages(messages.filter(msg => msg.id !== selectedMessageId));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setShowModal(false);
      setSelectedMessageId(null);
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
            <li className="nav-item"><Link to="/Messages" className="nav-link">Messages</Link></li>
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
          {loading ? (
            <p>Chargement...</p>
          ) : messages.length === 0 ? (
            <p>Aucun message trouvé.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 bg-white">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Nom</th>
                    <th className="p-2 border">Prénom</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Téléphone</th>
                    <th className="p-2 border">Message</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{msg.nom}</td>
                      <td className="p-2 border">{msg.prenom}</td>
                      <td className="p-2 border">{msg.email}</td>
                      <td className="p-2 border">{msg.telephone}</td>
                      <td className="p-2 border">{msg.message}</td>
                      <td className="p-2 border">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => confirmDelete(msg.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* MODAL DE CONFIRMATION */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce message ?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn-confirm">Oui, Supprimer</button>
              <button onClick={() => setShowModal(false)} className="btn-cancel">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
