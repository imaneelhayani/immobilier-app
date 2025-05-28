// ResultsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage() {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem('immobilierResults')) || [];

  const handleCommandeClick = (propertyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // ما مسجلش دخول: نوجه لصفحة login مع تمرير id العقار عبر query param
      navigate(`/login?propertyId=${propertyId}`);
    } else {
      // مسجل دخول: نوجه مباشرة لصفحة Commandes مع id العقار
      navigate(`/commandes?propertyId=${propertyId}`);
    }
  };

  return (
    <section>
      <h2>Résultats</h2>
      <ul>
        {results.map(item => (
          <li key={item.id}>
            <h3>{item.titre || item.type}</h3>
            <p>Ville: {item.ville}</p>
            <p>Surface: {item.surface} m²</p>
            <p>Prix: {item.prix} MAD</p>

            <button onClick={() => handleCommandeClick(item.id)}>
              Commande Fax
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ResultsPage;
