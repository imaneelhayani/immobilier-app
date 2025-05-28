import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/FilterImmobilier.css';
import '../Styles/main.css';
import { Link } from 'react-router-dom';

function FilterImmobilier() {
  const sampleProperties = [
  {
    id: 1,
    title: "Appartement moderne à Casablanca",
    type: "Appartement",
    price: 1200000,
    surface: 85,
    city: "Casablanca",
    image: "https://images.unsplash.com/photo-1560184897-69fddb50ff81?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Villa spacieuse à Marrakech",
    type: "Villa",
    price: 3500000,
    surface: 250,
    city: "Marrakech",
    image: "https://images.unsplash.com/photo-1600585154340-be6161b94caa?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Maison traditionnelle à Fès",
    type: "Maison",
    price: 900000,
    surface: 150,
    city: "Fès",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60",
  },
];
  // State li kay7fed les valeurs dial filtres
  const [filters, setFilters] = useState({
    type: '',
    surface_min: '',
    surface_max: '',
    ville: '',
    etat_transation: '',
    budget: '',
  });

  // State dial chargement
  const [loadingFilter, setLoadingFilter] = useState(false);
  const navigate = useNavigate();

  // Fonction kat update valeur dial filtre wahed wahed
  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Fonction li kat3ayet API w katdir filtre
  const handleFilter = async () => {
    setLoadingFilter(true);

    // Kaybni URL params mn filtre
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    try {
      // Appel API avec param filtres
      const res = await fetch(`http://localhost:8000/api/immobiliers/filter?${params.toString()}`);
      const data = await res.json();

      // Kay7fed résultat f localStorage bach nst3mlo f page resultat
      localStorage.setItem('immobilierResults', JSON.stringify(data.success ? data.data : []));

      // Redirection l page resultats
      navigate('/resultas');
    } catch (error) {
      console.error('Erreur de filtrage :', error);

      // Si erreur, n7ydou resultats (liste vide)
      localStorage.setItem('immobilierResults', JSON.stringify([]));
      navigate('/resultas');
    }

    setLoadingFilter(false);
  };

  return (
    <>
      <section className="filter-section max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {/* Introduction courte */}
        <p className="filter-intro">
          Trouvez facilement la maison ou l'appartement de vos rêves avec nos filtres personnalisés.
        </p>

        {/* Titre principal */}
        <h2 className="text-2xl font-bold text-center mb-6">Filtrer les biens immobiliers</h2>

        {/* Ligne des filtres */}
        <div className="filters-row">
          {/* Type de transaction */}
          <div className="filter-item">
            <label htmlFor="etat_transation" className="block mb-1 font-semibold text-gray-700">
              Type de transaction
            </label>
            <select name="etat_transation" value={filters.etat_transation} onChange={handleFilterChange}>
              <option value="">-- Tous --</option>
              <option value="louer">À louer</option>
              <option value="acheter">À vendre</option>
            </select>
          </div>

          {/* Ville */}
          <div className="filter-item">
            <label htmlFor="ville" className="block mb-1 font-semibold text-gray-700">Ville</label>
            <input
              type="text"
              name="ville"
              value={filters.ville}
              onChange={handleFilterChange}
              placeholder="Ex: Casablanca"
            />
          </div>

          {/* Type de bien */}
          <div className="filter-item">
            <label htmlFor="type" className="block mb-1 font-semibold text-gray-700">Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">-- Tous --</option>
              <option value="maison">Maison</option>
              <option value="appartement">Appartement</option>
              <option value="villa">Villa</option>
            </select>
          </div>

          {/* Surface minimum */}
          <div className="filter-item">
            <label htmlFor="surface_min" className="block mb-1 font-semibold text-gray-700">Surface min (m²)</label>
            <input
              type="number"
              name="surface_min"
              value={filters.surface_min}
              onChange={handleFilterChange}
              placeholder="50"
              min="0"
            />
          </div>

          {/* Surface maximum */}
          <div className="filter-item">
            <label htmlFor="surface_max" className="block mb-1 font-semibold text-gray-700">Surface max (m²)</label>
            <input
              type="number"
              name="surface_max"
              value={filters.surface_max}
              onChange={handleFilterChange}
              placeholder="200"
              min="0"
            />
          </div>

          {/* Budget maximum */}
          <div className="filter-item">
            <label htmlFor="budget" className="block mb-1 font-semibold text-gray-700">Budget max (MAD)</label>
            <input
              type="number"
              name="budget"
              value={filters.budget}
              onChange={handleFilterChange}
              placeholder="500000"
              min="0"
            />
          </div>
        </div>

        {/* Bouton recherche */}
        <div className="btn-container-1">
          <button
            onClick={handleFilter}
            disabled={loadingFilter}
            className={loadingFilter ? 'btn disabled' : 'btn-1'}
          >
            {loadingFilter ? 'Chargement...' : 'Rechercher'}
          </button>
        </div>
      </section>
      <section>
         <div className="home-container max-w-6xl mx-auto p-6">

      {/* Intro */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre plateforme immobilière</h1>
        <p className="text-lg text-gray-700 mb-6">
          Trouvez la maison ou l'appartement de vos rêves au Maroc facilement et rapidement.
        </p>
        <Link
          to="/filter"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Commencer la recherche
        </Link>
      </section>

      {/* Preview propriétés */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {sampleProperties.map((property) => (
          <div key={property.id} className="border rounded shadow hover:shadow-lg transition overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{property.title}</h3>
              <p className="text-gray-700 mb-1">Type: {property.type}</p>
              <p className="text-gray-700 mb-1">Surface: {property.surface} m²</p>
              <p className="text-gray-700 mb-1">Ville: {property.city}</p>
              <p className="text-blue-600 font-semibold text-lg">{property.price.toLocaleString()} MAD</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer simple */}
      <footer className="text-center text-gray-500 text-sm mt-20">
        © 2025 Votre Agence Immobilière. Tous droits réservés.
      </footer>

    </div>
      </section>
    </>
    
  );
}

export default FilterImmobilier;
