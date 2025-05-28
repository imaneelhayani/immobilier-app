import React from 'react';
import { useLocation } from 'react-router-dom';

function Commandes() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');

  // تجيب التفاصيل ديال العقار من localStorage أو API حسب id
  const results = JSON.parse(localStorage.getItem('immobilierResults')) || [];
  const property = results.find(item => item.id.toString() === propertyId);

  if (!property) return <p>Property not found.</p>;

  return (
    <div className="commande-details max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2>Détails de la commande pour la propriété</h2>
      <h3>{property.titre || property.type}</h3>
      <p>Ville: {property.ville}</p>
      <p>Surface: {property.surface} m²</p>
      <p>Prix: {property.prix} MAD</p>
      {/* إضافة أي تفاصيل أخرى تريدها هنا */}

      <button className="btn-commande mt-4" onClick={() => alert('Commande fax envoyée!')}>
        Confirmer Commande Fax
      </button>
    </div>
  );
}

export default Commandes;
