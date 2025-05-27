// src/pages/AjouterPropriete.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AjouterPropriete() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    ville: '',
    adresse: '',
    prix: '',
    prix_min: '',
    prix_max: '',
    surface: '',
    nbr_chambres: '',
    nbr_salles_bain: '',
    etat: 'disponible',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      prix: Number(formData.prix),
      prix_min: Number(formData.prix_min),
      prix_max: Number(formData.prix_max),
      surface: Number(formData.surface),
      nbr_chambres: Number(formData.nbr_chambres),
      nbr_salles_bain: Number(formData.nbr_salles_bain),
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/immobiliers',
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/proprietes');
    } catch (error) {
      const serverError = error.response?.data || error.message;
      console.error('Erreur lors de l\'ajout:', serverError);
      alert('Server Error:\n' + JSON.stringify(serverError, null, 2));
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter une nouvelle propriété</h2>
      <form onSubmit={handleSubmit}>
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">— Choisir le type —</option>
          <option value="maison">Maison</option>
          <option value="villa">Villa</option>
          <option value="appartement">Appartement</option>
          <option value="berau">Bureau</option>
          <option value="local_commercial">Local Commercial</option>
        </select>

        <label>Ville</label>
        <select name="ville" value={formData.ville} onChange={handleChange} required>
          <option value="">— Choisir la ville —</option>
          <option value="tanger">Tanger</option>
          <option value="casa">Casablanca</option>
          <option value="rabat">Rabat</option>
          <option value="marrakech">Marrakech</option>
          <option value="fes">Fès</option>
        </select>

        <label>Adresse</label>
        <input
          type="text"
          name="adresse"
          placeholder="Adresse complète"
          value={formData.adresse}
          onChange={handleChange}
          required
        />

        <label>Prix (MAD)</label>
        <input
          type="number"
          name="prix"
          placeholder="Prix"
          value={formData.prix}
          onChange={handleChange}
          required
        />

        <label>Prix min (MAD)</label>
        <input
          type="number"
          name="prix_min"
          placeholder="Prix min"
          value={formData.prix_min}
          onChange={handleChange}
          required
        />

        <label>Prix max (MAD)</label>
        <input
          type="number"
          name="prix_max"
          placeholder="Prix max"
          value={formData.prix_max}
          onChange={handleChange}
          required
        />

        <label>Surface (m²)</label>
        <input
          type="number"
          name="surface"
          placeholder="Surface"
          value={formData.surface}
          onChange={handleChange}
          required
        />

        <label>Nombre de chambres</label>
        <input
          type="number"
          name="nbr_chambres"
          placeholder="Chambres"
          value={formData.nbr_chambres}
          onChange={handleChange}
          required
        />

        <label>Nombre de salles de bain</label>
        <input
          type="number"
          name="nbr_salles_bain"
          placeholder="Salles de bain"
          value={formData.nbr_salles_bain}
          onChange={handleChange}
          required
        />

        <label>État</label>
        <select name="etat" value={formData.etat} onChange={handleChange} required>
          <option value="disponible">Disponible</option>
          <option value="vendue">Vendue</option>
          <option value="en_negociation">En négociation</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AjouterPropriete;
