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
      const response = await axios.get('http://127.0.0.1:8000/api/transactions');
      setTransactions(response.data); // تأكد أن API كترجع array
    } catch (error) {
      console.error("Erreur lors du chargement des transactions", error);
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
            <li className="nav-item"><Link to="/Transactions" className="nav-link active">Transactions</Link></li>
            <li className="nav-item"><a href="#" className="nav-link">Rapports</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Calendrier</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Paramètres</a></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Liste des Transactions</h1>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Propriété</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td>{t.id}</td>
                <td>{t.client_name}</td>
                <td>{t.property_title}</td>
                <td>{t.amount} MAD</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Transactions;
