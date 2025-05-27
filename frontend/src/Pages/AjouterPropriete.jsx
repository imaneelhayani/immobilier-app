import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/dashboard.css';

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
    etat_transation: '',
    description: '',
    caracteristiques: [],
  });

  const [images, setImages] = useState([]);

  // Gestion des inputs classiques et checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "caracteristiques[]") {
      let newCaracteristiques = [...formData.caracteristiques];
      if (checked) {
        newCaracteristiques.push(value);
      } else {
        newCaracteristiques = newCaracteristiques.filter(c => c !== value);
      }
      setFormData(prev => ({ ...prev, caracteristiques: newCaracteristiques }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Gestion de l'upload des images
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();

  // ajouter les champs classiques
  formDataToSend.append('type', formData.type);
  formDataToSend.append('ville', formData.ville);
  formDataToSend.append('adresse', formData.adresse);
  formDataToSend.append('prix', formData.prix);
  formDataToSend.append('prix_min', formData.prix_min);
  formDataToSend.append('prix_max', formData.prix_max);
  formDataToSend.append('surface', formData.surface);
  formDataToSend.append('nbr_chambres', formData.nbr_chambres);
  formDataToSend.append('nbr_salles_bain', formData.nbr_salles_bain);
  formDataToSend.append('etat', formData.etat);
  formDataToSend.append('etat_transation', formData.etat_transation);
  formDataToSend.append('description', formData.description || '');

  // Ajouter les images depuis l'input file
  const imagesInput = document.getElementById('images');
  if (imagesInput.files.length > 0) {
    for (let i = 0; i < imagesInput.files.length; i++) {
      formDataToSend.append('photo[]', imagesInput.files[i]);
    }
  }

  try {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://127.0.0.1:8000/api/immobiliers',
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',  // IMPORTANT pour les fichiers
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
            <li className="nav-item"><a href="#" className="nav-link active">Vue d'ensemble</a></li>
            <li className="nav-item"><Link to="/Proprietes" className="nav-link">Propriétés</Link></li>
            <li className="nav-item"><a href="#" className="nav-link">Clients</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Transactions</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Rapports</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Calendrier</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Paramètres</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>➕ Ajouter une Propriété</h1>
        </header>

        <div className="content">
          <form className="add-property-form" onSubmit={handleSubmit}>

            <div className="form-section">
              <h3 className="section-title">📋 Informations de base</h3>
              <div className="form-grid">

                <div className="form-group">
                  <label>Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange} required className="form-select">
                    <option value="">— Choisir le type —</option>
                    <option value="maison">Maison</option>
                    <option value="villa">Villa</option>
                    <option value="appartement">Appartement</option>
                    <option value="bureau">Bureau</option>
                    <option value="local_commercial">Local Commercial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Ville *</label>
                  <select name="ville" value={formData.ville} onChange={handleChange} required className="form-select">
                    <option value="">— Choisir la ville —</option>
                    <option value="tanger">Tanger</option>
                    <option value="casa">Casablanca</option>
                    <option value="rabat">Rabat</option>
                    <option value="marrakech">Marrakech</option>
                    <option value="fes">Fès</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prix *</label>
                  <input type="number" name="prix" onChange={handleChange} value={formData.prix} required className="form-input" />
                </div>

                <div className="form-group">
                  <label>Prix min *</label>
                  <input type="number" name="prix_min" onChange={handleChange} value={formData.prix_min} required className="form-input" />
                </div>

                <div className="form-group">
                  <label>Prix max *</label>
                  <input type="number" name="prix_max" onChange={handleChange} value={formData.prix_max} required className="form-input" />
                </div>

                <div className="form-group">
                  <label>Surface *</label>
                  <input type="number" name="surface" onChange={handleChange} value={formData.surface} required className="form-input" />
                </div>

                <div className="form-group">
                  <label>Chambres *</label>
                  <input type="number" name="nbr_chambres" onChange={handleChange} value={formData.nbr_chambres} required className="form-input" />
                </div>

                <div className="form-group">
                  <label>Salles de bain *</label>
                  <input type="number" name="nbr_salles_bain" onChange={handleChange} value={formData.nbr_salles_bain} required className="form-input" />
                </div>

                <div className="form-group">
                  <label>État</label>
                  <select name="etat" onChange={handleChange} value={formData.etat} required className="form-select">
                    <option value="disponible">Disponible</option>
                    <option value="vendue">Vendue</option>
                    <option value="en_negociation">En négociation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>État de la transaction *</label>
                  <select
                    name="etat_transation"
                    value={formData.etat_transation}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">— Choisir —</option>
                    <option value="louer">Louer</option>
                    <option value="acheter">Acheter</option>
                  </select>
                </div>

              </div>
            </div>

            <div className="form-section">
              <h3>📍 Adresse</h3>
              <textarea name="adresse" onChange={handleChange} value={formData.adresse} required className="form-textarea" placeholder="Adresse complète" />
            </div>

            <div className="form-section">
              <h3>📝 Description</h3>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Décrire la propriété"
                rows="5"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-section">
              <h3>⭐ Caractéristiques</h3>
              <div className="characteristics-grid">
                {['parking', 'jardin', 'piscine', 'climatisation', 'chauffage', 'ascenseur', 'terrasse', 'garage'].map((car) => (
                  <div key={car} className="checkbox-group">
                    <input
                      type="checkbox"
                      name="caracteristiques[]"
                      id={car}
                      value={car}
                      checked={formData.caracteristiques.includes(car)}
                      onChange={handleChange}
                    />
                    <label htmlFor={car}>{car.charAt(0).toUpperCase() + car.slice(1)}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>📸 Photos</h3>
              <input
  id="images"    // zid hada
  type="file"
  name="photo[]"
  multiple
  accept="image/*"
  onChange={handleImageChange}
  required
  className="form-file"
/>

              {images.length > 0 && (
                <div className="preview-images">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="preview-thumb"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="form-section form-actions">
              <button type="submit" className="btn btn-primary">Ajouter la propriété</button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default AjouterPropriete;
