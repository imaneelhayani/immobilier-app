import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/contacts', formData);
      setSuccessMessage(res.data.message);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur serveur', error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Contactez-nous</h2>

      {successMessage && (
        <div className="mb-4 text-green-600 font-medium">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom[0]}</p>}
        </div>

        <div>
          <label className="block">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom[0]}</p>}
        </div>

        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block">Téléphone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone[0]}</p>}
        </div>

        <div>
          <label className="block">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message[0]}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Envoyer le message
        </button>
      </form>
    </div>
  );
}

export default Contact;
