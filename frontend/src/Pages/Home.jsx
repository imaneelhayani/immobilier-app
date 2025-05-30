import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Home, MapPin, Maximize, DollarSign, Building, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Section filtre stylée */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Header avec icône */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Trouvez facilement la maison ou l'appartement de vos rêves avec nos filtres personnalisés.
            </p>
          </div>

          {/* Card de filtre moderne */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Filter className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Filtrer les biens immobiliers</h2>
            </div>

            {/* Grille des filtres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Type de transaction */}
              <div className="space-y-2">
                <label htmlFor="etat_transation" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Building className="w-4 h-4 mr-2 text-blue-500" />
                  Type de transaction
                </label>
                <select 
                  name="etat_transation" 
                  value={filters.etat_transation} 
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                >
                  <option value="">-- Tous --</option>
                  <option value="louer">À louer</option>
                  <option value="acheter">À vendre</option>
                </select>
              </div>

              {/* Ville */}
              <div className="space-y-2">
                <label htmlFor="ville" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Ville
                </label>
                <input
                  type="text"
                  name="ville"
                  value={filters.ville}
                  onChange={handleFilterChange}
                  placeholder="Ex: Casablanca"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                />
              </div>

              {/* Type de bien */}
              <div className="space-y-2">
                <label htmlFor="type" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Home className="w-4 h-4 mr-2 text-blue-500" />
                  Type
                </label>
                <select 
                  name="type" 
                  value={filters.type} 
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                >
                  <option value="">-- Tous --</option>
                  <option value="maison">Maison</option>
                  <option value="appartement">Appartement</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* Surface minimum */}
              <div className="space-y-2">
                <label htmlFor="surface_min" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Maximize className="w-4 h-4 mr-2 text-blue-500" />
                  Surface min (m²)
                </label>
                <input
                  type="number"
                  name="surface_min"
                  value={filters.surface_min}
                  onChange={handleFilterChange}
                  placeholder="50"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                />
              </div>

              {/* Surface maximum */}
              <div className="space-y-2">
                <label htmlFor="surface_max" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Maximize className="w-4 h-4 mr-2 text-blue-500" />
                  Surface max (m²)
                </label>
                <input
                  type="number"
                  name="surface_max"
                  value={filters.surface_max}
                  onChange={handleFilterChange}
                  placeholder="200"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                />
              </div>

              {/* Budget maximum */}
              <div className="space-y-2">
                <label htmlFor="budget" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                  Budget max (MAD)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={filters.budget}
                  onChange={handleFilterChange}
                  placeholder="500000"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Bouton recherche stylé */}
            <div className="text-center">
              <button
                onClick={handleFilter}
                disabled={loadingFilter}
                className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  loadingFilter 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                }`}
              >
                {loadingFilter ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    Chargement...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-3" />
                    Rechercher
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section d'accueil avec propriétés */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Intro stylée */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Bienvenue sur notre plateforme immobilière
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trouvez la maison ou l'appartement de vos rêves au Maroc facilement et rapidement.
            </p>
            <Link
              to="/filter"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Search className="w-5 h-5 mr-3" />
              Commencer la recherche
            </Link>
          </div>

          {/* Cards des propriétés */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sampleProperties.map((property) => (
              <div key={property.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Building className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Type: {property.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Maximize className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Surface: {property.surface} m²</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Ville: {property.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">
                      {property.price.toLocaleString()} MAD
                    </p>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

         
        </div>
      </section>
    </div>
  );
}

export default FilterImmobilier;