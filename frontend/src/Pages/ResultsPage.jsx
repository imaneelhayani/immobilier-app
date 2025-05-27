import React, { useState, useEffect } from 'react';

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [orderData, setOrderData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    immobilier_id: null,
  });

  const [messageModal, setMessageModal] = useState({ visible: false, text: '' });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem('immobilierResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const openOrderModal = (property) => {
    setOrderData({
      nom: '',
      prenom: '',
      telephone: '',
      adresse: '',
      immobilier_id: property.id,
    });
    setShowOrderModal(true);
  };

  const showMessage = (msg) => setMessageModal({ visible: true, text: msg });
  const closeMessage = () => setMessageModal({ visible: false, text: '' });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('auth_token', data.access_token);
        showMessage('Connexion réussie');
        setShowLoginModal(false);
        setShowOrderModal(true);
        setLoginData({ email: '', password: '' });
      } else {
        showMessage(data.message || "Erreur lors de la connexion");
      }
    } catch {
      showMessage("Erreur de connexion au serveur");
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage('Inscription réussie, vous pouvez maintenant vous connecter');
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterData({ name: '', email: '', password: '', password_confirmation: '' });
      } else {
        showMessage(
          typeof data === 'object'
            ? Object.values(data).flat().join('\n')
            : data.message || "Erreur lors de l'inscription"
        );
      }
    } catch {
      showMessage("Erreur de connexion au serveur");
    }
    setLoading(false);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    if (!token) {
      showMessage('Vous devez vous connecter d\'abord');
      setShowOrderModal(false);
      setShowLoginModal(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/demandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage('Commande envoyée avec succès');
        localStorage.removeItem('auth_token');
        window.location.href = '/';
      } else {
        showMessage(data.message || "Erreur lors de l'envoi de la commande");
      }
    } catch {
      showMessage("Erreur de connexion au serveur");
    }
    setLoading(false);
    setShowOrderModal(false);
  };

  return (
    <div className="container">
      <h2>Résultats de recherche</h2>
      <hr />
      <div className="properties-grid">
        {results.length === 0 && <p>Aucun résultat</p>}
        {results.map((item) => (
          <div className="property-card" key={item.id}>
            <div className="property-image">
              🏠
              <span className={`property-status ${item.etat.toLowerCase()}`}>
                {item.etat}
              </span>
            </div>
            <div className="property-content">
              <h3>{item.type}</h3>
              <div>📍 {item.ville}</div>
              <div>
                <span>{item.nbr_chambres} chambres</span> -{' '}
                <span>{item.nbr_salles_bain} salles de bain</span> -{' '}
                <span>{item.surface} m²</span>
              </div>
              <div>{item.prix.toLocaleString()} MAD</div>
              <div className="btn-group">
                <button
                  onClick={() => {
                    if (item.etat === 'vendue') {
                      showMessage('Désolé, ce bien est vendu');
                    } else {
                      openOrderModal(item);
                    }
                  }}
                  className="btn btn-primary"
                >
                  Commander
                </button>
                <button onClick={() => setSelectedProperty(item)} className="btn btn-secondary">
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Détails du bien */}
      {selectedProperty && (
        <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h3>Détails du bien</h3>
            <p>Type : {selectedProperty.type}</p>
            <p>Ville : {selectedProperty.ville}</p>
            <p>Nombre de chambres : {selectedProperty.nbr_chambres}</p>
            <p>Nombre de salles de bain : {selectedProperty.nbr_salles_bain}</p>
            <p>Surface : {selectedProperty.surface} m²</p>
            <p>État : {selectedProperty.etat}</p>
            <p>Prix : {selectedProperty.prix.toLocaleString()} MAD</p>
            <button className="btn btn-close" onClick={() => setSelectedProperty(null)}>Fermer</button>
          </div>
        </div>
      )}

      {/* Modal Connexion */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h3>Connexion</h3>
            <form onSubmit={handleLoginSubmit} className="modal-form">
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Envoi en cours...' : 'Se connecter'}
              </button>
              <button type="button" onClick={() => setShowLoginModal(false)} className="btn btn-close">
                Annuler
              </button>
            </form>
            <p className="switch-modal-text">
              Pas encore de compte ?{' '}
              <span
                className="link-text"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
              >
                Inscrivez-vous ici
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Modal Inscription */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h3>Inscription</h3>
            <form onSubmit={handleRegisterSubmit} className="modal-form">
              <input
                type="text"
                placeholder="Nom complet"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirmation du mot de passe"
                value={registerData.password_confirmation}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password_confirmation: e.target.value })
                }
                required
              />
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Envoi en cours...' : 'S\'inscrire'}
              </button>
              <button type="button" onClick={() => setShowRegisterModal(false)} className="btn btn-close">
                Annuler
              </button>
            </form>
            <p className="switch-modal-text">
              Déjà un compte ?{' '}
              <span
                className="link-text"
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
              >
                Connectez-vous
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Modal Commande */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h3>Commander un bien</h3>
            <form onSubmit={handleOrderSubmit} className="modal-form">
              <input
                type="text"
                placeholder="Nom"
                value={orderData.nom}
                onChange={(e) => setOrderData({ ...orderData, nom: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Prénom"
                value={orderData.prenom}
                onChange={(e) => setOrderData({ ...orderData, prenom: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={orderData.telephone}
                onChange={(e) => setOrderData({ ...orderData, telephone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Adresse"
                value={orderData.adresse}
                onChange={(e) => setOrderData({ ...orderData, adresse: e.target.value })}
                required
              />
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Envoi en cours...' : 'Envoyer la commande'}
              </button>
              <button type="button" onClick={() => setShowOrderModal(false)} className="btn btn-close">
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Message */}
      {messageModal.visible && (
        <div className="modal-overlay" onClick={closeMessage}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <p>{messageModal.text}</p>
            <button onClick={closeMessage} className="btn btn-primary">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
