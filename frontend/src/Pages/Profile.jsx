import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError("Veuillez vous connecter d'abord");
      setLoading(false);
      return;
    }

    const fetchUserAndDemandes = async () => {
      try {
        // Fetch user info
        const userRes = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!userRes.ok) throw new Error("Erreur lors de la récupération de l'utilisateur");
        const userData = await userRes.json();

        // Fetch demandes
        const demandesRes = await fetch('http://localhost:8000/api/demandes', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!demandesRes.ok) throw new Error('Erreur lors de la récupération des demandes');
        const demandesData = await demandesRes.json();

        setUser(userData);
        setDemandes(demandesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserAndDemandes();
  }, [token]);

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  // Function to display status with color badges
  const renderStatus = (status) => {
    let color = '#999';
    let label = '';

    switch(status) {
      case 'en_attente':
        color = '#f0ad4e'; // orange
        label = 'En attente';
        break;
      case 'accepte':
        color = '#5cb85c'; // vert
        label = 'Accepté';
        break;
      case 'refuse':
        color = '#d9534f'; // rouge
        label = 'Refusé';
        break;
      default:
        label = status;
    }

    return (
      <span style={{
        padding: '5px 10px',
        color: 'white',
        backgroundColor: color,
        borderRadius: 5,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        display: 'inline-block',
        minWidth: 80,
        textAlign: 'center',
      }}>
        {label}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ fontSize: 28, marginBottom: 20, textAlign: 'center' }}>Profil de l'utilisateur</h2>

      <div style={{
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 10,
        marginBottom: 30,
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginBottom: 10 }}>Informations personnelles</h3>
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
      </div>

      <div style={{
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginBottom: 10 }}>Vos demandes</h3>
        {demandes.length === 0 ? (
          <p>Aucune demande trouvée.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ border: '1px solid #ccc', padding: 10, textAlign: 'left' }}>Bien immobilier</th>
                <th style={{ border: '1px solid #ccc', padding: 10, textAlign: 'left' }}>Statut</th>
                <th style={{ border: '1px solid #ccc', padding: 10, textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map(demande => (
                <tr key={demande.id} style={{ backgroundColor: '#fff' }}>
                  <td style={{ border: '1px solid #eee', padding: 10 }}>
                    {demande.immobilier ? demande.immobilier.type || 'Bien' : 'Inconnu'}
                  </td>
                  <td style={{ border: '1px solid #eee', padding: 10 }}>
                    {renderStatus(demande.status)} {/* هنا كنعرضو status */}
                  </td>
                  <td style={{ border: '1px solid #eee', padding: 10 }}>
                    {new Date(demande.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Profile;
