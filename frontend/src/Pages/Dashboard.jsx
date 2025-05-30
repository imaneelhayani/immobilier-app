import React, { useEffect, useState } from 'react';
import '../Styles/dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const [totalProperties, setTotalProperties] = useState(0);
  const [stats, setStats] = useState({
    location_vs_vente: [],
    top_villes: [],
  });
  const [demandeStats, setDemandeStats] = useState({
    top_villes: [],
    top_types: []
  });

  // Couleurs des types (loyer / vente / types de biens)
  const TYPE_COLORS = {
    louer: '#1f77b4',      // Bleu pour location
    acheter: '#ff7f0e',    // Orange pour vente
    maison: '#8884d8',
    villa: '#82ca9d',
    appartement: '#ffc658',
    bureau: '#ff8042',
    local_commercial: '#0088fe'
  };

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
      const totalRes = await axios.get('http://127.0.0.1:8000/api/properties/total');
      setTotalProperties(totalRes.data.total);

      const statsRes = await axios.get('http://127.0.0.1:8000/api/properties/stats');
      setStats(statsRes.data);

      const demandeRes = await axios.get('http://127.0.0.1:8000/api/demandes/stats');
      setDemandeStats(demandeRes.data);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Composant légende dynamique selon les données reçues
  const PieLegend = ({ data, typeColors }) => (
    <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 10 }}>
      {data.map(({ type }) => (
        <li key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div style={{
            width: 16,
            height: 16,
            backgroundColor: typeColors[type.toLowerCase()] || '#ccc',
            marginRight: 8,
            borderRadius: 3,
            border: '1px solid #ccc'
          }} />
          <span style={{ textTransform: 'capitalize' }}>{type.replace('_', ' ')}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
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

          <div className="charts-section">
    <h2 className="section-title">
      🏠 Statistiques des Propriétés
    </h2>
    
    <div className="charts-grid">
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Type de Propriétés</h3>
          <span className="chart-subtitle">Location vs Vente</span>
        </div>
        <div className="chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={stats.location_vs_vente}
              dataKey="total"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stats.location_vs_vente.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={TYPE_COLORS[entry.type.toLowerCase()] || '#ccc'}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <PieLegend data={stats.location_vs_vente} typeColors={TYPE_COLORS} />
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Top Villes</h3>
          <span className="chart-subtitle">Par nombre d'annonces</span>
        </div>
        <div className="chart-container">
          <BarChart width={500} height={300} data={stats.top_villes}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="ville" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Legend />
            <Bar 
              dataKey="total" 
              fill="#10b981" 
              name="Total Annonces"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </div>
    </div>
  </div>

  {/* Section Demandes */}
  <div className="charts-section">
    <h2 className="section-title">
      📈 Statistiques des Demandes
    </h2>
    
    <div className="charts-grid">
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Top Villes</h3>
          <span className="chart-subtitle">Par nombre de demandes</span>
        </div>
        <div className="chart-container">
          <BarChart width={500} height={300} data={demandeStats.top_villes}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="ville" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Legend />
            <Bar 
              dataKey="total" 
              fill="#3b82f6" 
              name="Total Demandes"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Types de Demandes</h3>
          <span className="chart-subtitle">Répartition par catégorie</span>
        </div>
        <div className="chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={demandeStats.top_types}
              dataKey="total"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {demandeStats.top_types.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={TYPE_COLORS[entry.type.toLowerCase()] || '#ccc'}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <PieLegend data={demandeStats.top_types} typeColors={TYPE_COLORS} />
        </div>
      </div>
    </div>
  </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
