import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FilterImmobilier() {
  const [filters, setFilters] = useState({
    type: '',
    surface_min: '',
    surface_max: '',
    ville: '',
    etat_transation:'',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // hook ديال التوجيه

  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFilter = async () => {
    setLoading(true);

    const params = new URLSearchParams();

    if (filters.type) params.append('type', filters.type);
    if (filters.surface_min) params.append('surface_min', filters.surface_min);
    if (filters.surface_max) params.append('surface_max', filters.surface_max);
    if (filters.ville) params.append('ville', filters.ville);
    if (filters.etat_transation) params.append('etat_transation', filters.etat_transation);

    try {
      const res = await fetch(`http://localhost:8000/api/immobiliers/filter?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        // خزّن النتائج فالـ localStorage
        localStorage.setItem('immobilierResults', JSON.stringify(data.data));
        // توجه لصفحة النتائج
        navigate('/resultas');
      } else {
        // إذا ماكانتش نتائج، كذلك خزن مصفوفة فارغة
        localStorage.setItem('immobilierResults', JSON.stringify([]));
        navigate('/resultas');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      localStorage.setItem('immobilierResults', JSON.stringify([]));
      navigate('/resultas');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>فلترة العقارات</h2>
       <div>
        <label>etat_transation:</label>
        <select name="etat_transation" value={filters.etat_transation} onChange={handleChange}>
          <option value="">-- كل الأنواع --</option>
          <option value="louer">à louer</option>
          <option value="acheter">à vendre</option>
        </select>
      </div>
      <div>
        <label>المدينة:</label>
        <input
          type="text"
          name="ville"
          value={filters.ville}
          onChange={handleChange}
          placeholder="مثلا الدار البيضاء"
        />
      </div>

      <div>
        <label>النوع:</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">-- كل الأنواع --</option>
          <option value="maison">Maison</option>
          <option value="appartement">Appartement</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      <div>
        <label>المساحة الدنيا (م²):</label>
        <input
          type="number"
          name="surface_min"
          value={filters.surface_min}
          onChange={handleChange}
          placeholder="مثلا 50"
        />
      </div>

      <div>
        <label>المساحة القصوى (م²):</label>
        <input
          type="number"
          name="surface_max"
          value={filters.surface_max}
          onChange={handleChange}
          placeholder="مثلا 200"
        />
      </div>

      <button onClick={handleFilter} disabled={loading}>
        {loading ? 'جار التحميل...' : 'ابحث'}
      </button>
    </div>
  );
}

export default FilterImmobilier;
