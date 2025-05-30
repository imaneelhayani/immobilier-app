import React, { useEffect, useState } from 'react';
import { User, FileText, Calendar, Mail } from 'lucide-react';
import '../Styles/tai.css';

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
        const demandesRes = await fetch('http://localhost:8000/api/user/demandes', {
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

  // Fonction pour supprimer une demande
  const handleDelete = async (id) => {
    if (!window.confirm("Vous voulez vraiment supprimer cette demande ?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/demandes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression');

      // Mise à jour locale sans refaire tout fetch
      setDemandes(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Fonction pour afficher le statut avec badge
  const renderStatus = (status) => {
    const statusConfig = {
      en_attente: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        label: 'En attente',
        icon: '⏳'
      },
      accepte: {
        color: 'bg-green-100 text-green-800 border-green-200',
        label: 'Accepté',
        icon: '✓'
      },
      refuse: {
        color: 'bg-red-100 text-red-800 border-red-200',
        label: 'Refusé',
        icon: '✗'
      }
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      label: status,
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Profil de l'utilisateur</h1>
          <p className="text-gray-600">Gérez vos informations et suivez vos demandes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informations personnelles */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Informations personnelles</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Nom</p>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Statistiques</h2>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-blue-600">{demandes.length}</p>
                <p className="text-sm text-gray-600 font-medium">Total</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-green-600">
                  {demandes.filter(d => d.status === 'accepté').length}
                </p>
                <p className="text-sm text-gray-600 font-medium">Acceptées</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-red-600">
                  {demandes.filter(d => d.status === 'refusé').length}
                </p>
                <p className="text-sm text-gray-600 font-medium">Refusées</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-yellow-600">
                  {demandes.filter(d => d.status === 'en_attente').length}
                </p>
                <p className="text-sm text-gray-600 font-medium">En attente</p>
              </div>
            </div>

          </div>
        </div>

        {/* Liste des demandes */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Vos demandes</h2>
                <p className="text-gray-500">Toutes vos demandes récentes</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700">
                <tr>
                  <th className="py-4 px-6">Type de bien</th>
                  <th className="py-4 px-6">Statut</th>
                  <th className="py-4 px-6">Date de demande</th>
                  <th className="py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((demande) => (
                  <tr
                    key={demande.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">
                          {demande.immobilier ? demande.immobilier.type || 'Bien' : 'Inconnu'}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">{renderStatus(demande.status)}</td>

                    <td className="py-4 px-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(demande.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {/* Bouton Supprimer uniquement si statut est en_attente */}
                      {demande.status === 'en_attente' && (
                        <button
                          onClick={() => handleDelete(demande.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Supprimer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default Profile;
