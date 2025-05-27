import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/FilterImmobilier.css';
import '../Styles/main.css';


function FilterImmobilier() {
  const [filters, setFilters] = useState({
    type: '',
    surface_min: '',
    surface_max: '',
    ville: '',
    etat_transation: '',
    budget: '',
  });

  const [status, setStatus] = useState('');
  const [loadingFilter, setLoadingFilter] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFilter = async () => {
    setLoadingFilter(true);
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    try {
      const res = await fetch(`http://localhost:8000/api/immobiliers/filter?${params.toString()}`);
      const data = await res.json();

      localStorage.setItem('immobilierResults', JSON.stringify(data.success ? data.data : []));
      navigate('/resultas');
    } catch (error) {
      console.error('Erreur de filtrage :', error);
      localStorage.setItem('immobilierResults', JSON.stringify([]));
      navigate('/resultas');
    }

    setLoadingFilter(false);
  };

  return (
    <>
    <section className="filter-section max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <p className="filter-intro">Trouvez facilement la maison ou l'appartement de vos rêves avec nos filtres personnalisés.</p>
      <h2 className="text-2xl font-bold text-center mb-6">Filtrer les biens immobiliers</h2>

      <div className="filters-row">
        <div className="filter-item">
          <label htmlFor="etat_transation" className="block mb-1 font-semibold text-gray-700">Type de transaction</label>
          <select name="etat_transation" value={filters.etat_transation} onChange={handleFilterChange}>
            <option value="">-- Tous --</option>
            <option value="louer">À louer</option>
            <option value="acheter">À vendre</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="ville" className="block mb-1 font-semibold text-gray-700">Ville</label>
          <input type="text" name="ville" value={filters.ville} onChange={handleFilterChange} placeholder="Ex: Casablanca" />
        </div>

        <div className="filter-item">
          <label htmlFor="type" className="block mb-1 font-semibold text-gray-700">Type</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">-- Tous --</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="surface_min" className="block mb-1 font-semibold text-gray-700">Surface min (m²)</label>
          <input type="number" name="surface_min" value={filters.surface_min} onChange={handleFilterChange} placeholder="50" />
        </div>

        <div className="filter-item">
          <label htmlFor="surface_max" className="block mb-1 font-semibold text-gray-700">Surface max (m²)</label>
          <input type="number" name="surface_max" value={filters.surface_max} onChange={handleFilterChange} placeholder="200" />
        </div>

        <div className="filter-item">
          <label htmlFor="budget" className="block mb-1 font-semibold text-gray-700">Budget max (MAD)</label>
          <input type="number" name="budget" value={filters.budget} onChange={handleFilterChange} placeholder="500000" />
        </div>
      </div>

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
    

    </>
  );
}

export default FilterImmobilier;
