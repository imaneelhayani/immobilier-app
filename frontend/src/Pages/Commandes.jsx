import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Commandes.css';

const API_URL = 'http://localhost:8000/api';  // عدل هاد ال URL حسب بورت Laravel ديالك

function Commandes() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');

  const results = JSON.parse(localStorage.getItem('immobilierResults')) || [];
  const property = results.find(item => item.id.toString() === propertyId);

  // States ديال الفورم
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!property) return <p>Property not found.</p>;

 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const token = localStorage.getItem('token');

    const data = {
      immobilier_id: propertyId,
      nom,
      prenom,
      telephone,
      adresse,
    };

    try {
      const response = await fetch(`${API_URL}/demandes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage('Erreur: ' + (errorData.message || 'Erreur inconnue'));
        setLoading(false);
        return;
      }

      await response.json();
      setMessage('Demande envoyée avec succès !');
      setNom('');
      setPrenom('');
      setTelephone('');
      setAdresse('');
    } catch (error) {
      setMessage('Erreur réseau : ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="commande-details max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      

      <h2 className="text-2xl font-bold mb-4">Détails de la commande pour la propriété</h2>
      <h3 className="text-xl mb-2">{property.titre || property.type}</h3>
      <p>Ville: {property.ville}</p>
      <p>Surface: {property.surface} m²</p>
      <p>Prix: {property.prix} MAD</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Téléphone"
          value={telephone}
          onChange={e => setTelephone(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={e => setAdresse(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default Commandes;
