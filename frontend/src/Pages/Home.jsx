import React, { useState } from 'react';

function FilterImmobilier() {
  const [filters, setFilters] = useState({
    type: '',
    surface_min: '',
    surface_max: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFilter = async () => {
    setLoading(true);
    // بناء رابط API مع Query Params حسب الفلاتر
    const params = new URLSearchParams();

    if (filters.type) params.append('type', filters.type);
    if (filters.surface_min) params.append('surface_min', filters.surface_min);
    if (filters.surface_max) params.append('surface_max', filters.surface_max);

    try {
      const res = await fetch(`http://localhost:8000/api/immobiliers/filter?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>hhhhh</h1>
      <h2>فلترة العقارات</h2>

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

      <hr />

      <div>
        {results.length === 0 && <p>لا توجد نتائج</p>}

        {results.map((item) => (
          <div key={item.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <h3>{item.type} - {item.adress}</h3>
            <p>المساحة: {item.surface} م²</p>
            <p>السعر: {item.prix} د.م</p>
            <p>الحالة: {item.etat ? 'متوفر' : 'غير متوفر'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterImmobilier;
