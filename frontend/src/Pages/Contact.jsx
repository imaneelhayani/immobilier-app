import React, { useState } from 'react';

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
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Votre message a été envoyé avec succès !");
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          message: '',
        });
        setErrors({});
        setShowModal(true);
      } else if (response.status === 422) {
        const data = await response.json();
        setErrors(data.errors || {});
      } else {
        console.error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nous sommes là pour vous aider. N&apos;hésitez pas à nous faire part de vos questions ou commentaires.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Envoyez-nous un message</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    placeholder="Votre nom"
                  />
                  {errors.nom && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.nom[0]}</p>}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    placeholder="Votre prénom"
                  />
                  {errors.prenom && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.prenom[0]}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email[0]}</p>}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    placeholder="+33 1 23 45 67 89"
                  />
                  {errors.telephone && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.telephone[0]}</p>}
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400 resize-none"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.message[0]}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2z" />
                  </svg>
                  Envoyer
                </span>
              </button>
            </div>
          </form>

          <div className="space-y-8">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=600&q=80"
              alt="Agence immobilière"
              className="rounded-3xl shadow-lg max-w-md w-full"
            />
          </div>

          {/* Carte Google */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h2 className="text-xl font-bold mb-2 text-gray-800">📍 ISTA NTIC ISMONTIC - Tanger</h2>
            <p className="text-gray-600 mb-4">Route Tanja Balia, Tanger, Maroc</p>
            <div className="rounded-xl overflow-hidden shadow">
              <iframe
                title="ISTA NTIC Tanger Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.070507510297!2d-5.787907684409289!3d35.769635080170455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b87c745c3b58b%3A0xd3e5d50c4f8fbbf0!2sISTA%20NTIC%20Tanger!5e0!3m2!1sfr!2sma!4v1686949815943!5m2!1sfr!2sma"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
          
        </div>

        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Succès !</h3>
              <p className="mb-6">{successMessage}</p>
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
       <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse</h4>
                    <p className="text-gray-600">123 Rue de la Paix, 75001 Paris</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">contact@entreprise.com</p>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
}

export default Contact;
