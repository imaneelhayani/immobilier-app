import React, { useEffect, useState } from 'react';
import '../Styles/dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchTransactions();
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/demandes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des transactions", error);
    }
  };

  const updateStatus = async (id, newStatus, userId) => {
    try {
      // 1. تحديث حالة المعاملة
      await axios.patch(
        `http://127.0.0.1:8000/api/demandes/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // 2. إرسال notification للمستخدم
      await axios.post(
        'http://127.0.0.1:8000/api/notifications',
        {
          user_id: userId,
          title: 'تحديث حالة المعاملة',
          message: `تم ${newStatus === 'accepté' ? 'قبول' : 'رفض'} المعاملة رقم ${id}`,
          is_read: false,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // 3. إعادة تحميل المعاملات
      fetchTransactions();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou notification', error);
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
          <h1>Liste des Transactions</h1>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Propriété</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td>{t.id}</td>
                <td>{t.user?.name || 'N/A'}</td>
                <td>{t.immobilier?.titre || 'N/A'}</td>
                <td>{t.immobilier?.prix} MAD</td>
                <td>{new Date(t.created_at).toLocaleDateString()}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    onClick={() => updateStatus(t.id, 'accepté', t.user?.id)}
                    className="btn-accept"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => updateStatus(t.id, 'refusé', t.user?.id)}
                    className="btn-refuse"
                  >
                    Refuser
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </main>
    </div>
  );
}

export default Transactions;
