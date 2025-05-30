// ResultsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage() {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem('immobilierResults')) || [];

  const handleCommandeClick = (propertyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // ما مسجلش دخول: نوجه لصفحة login مع تمرير id العقار عبر query param
      navigate(`/login?propertyId=${propertyId}`);
    } else {
      // مسجل دخول: نوجه مباشرة لصفحة Commandes مع id العقار
      navigate(`/commandes?propertyId=${propertyId}`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (results.length === 0) {
    return (
      <div className="results-container">
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h2>Aucun résultat trouvé</h2>
          <p>Essayez de modifier vos critères de recherche</p>
          <button 
            className="back-button"
            onClick={() => navigate('/search')}
          >
            Nouvelle recherche
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="results-title">
          <span className="results-icon">🔍</span>
          Résultats de recherche
        </h1>
        <div className="results-count">
          {results.length} propriété{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="properties-grid">
        {results.map(item => (
          <div key={item.id} className="property-card">
            <div className="property-image">
              <div className="image-placeholder">
                <span className="property-type-badge">
                  {item.etat || 'Propriété'}
                </span>
              </div>
            </div>
            
            <div className="property-content">
              <div className="property-header">
                <h3 className="property-title">
                  {item.titre || item.type}
                </h3>
                <div className="property-price">
                  {formatPrice(item.prix)}
                </div>
              </div>

              <div className="property-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{item.ville}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📐</span>
                  <span className="detail-text">{item.surface} m²</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span className="detail-text">
                    {item.prix } MAD/m²
                  </span>
                </div>
              </div>

              <div className="property-actions">
                <button 
                  className="commande-button"
                  onClick={() => handleCommandeClick(item.id)}
                >
                  <span className="button-icon">📄</span>
                  Commande Fax
                </button>
                <button className="details-button">
                  <span className="button-icon">👁️</span>
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .results-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .results-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px 0;
        }

        .results-title {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .results-icon {
          font-size: 36px;
        }

        .results-count {
          font-size: 16px;
          color: #64748b;
          font-weight: 500;
          background: #e2e8f0;
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
          padding: 0;
          list-style: none;
        }

        .property-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          animation: fadeInUp 0.6s ease-out;
        }

        .property-card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .property-image {
          height: 200px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          position: relative;
        }

        .image-placeholder::before {
          content: '🏠';
          font-size: 48px;
          opacity: 0.7;
        }

        .property-type-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .property-content {
          padding: 20px;
        }

        .property-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 12px;
        }

        .property-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          line-height: 1.4;
          flex: 1;
        }

        .property-price {
          font-size: 20px;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 6px 12px;
          border-radius: 8px;
          white-space: nowrap;
        }

        .property-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
        }

        .detail-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        .detail-text {
          font-weight: 500;
        }

        .property-actions {
          display: flex;
          gap: 10px;
        }

        .commande-button {
          flex: 1;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .commande-button:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 8px 15px rgba(59, 130, 246, 0.3);
        }

        .details-button {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .details-button:hover {
          background: #e2e8f0;
          color: #475569;
          transform: translateY(-1px);
        }

        .button-icon {
          font-size: 16px;
        }

        /* État vide */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .empty-state h2 {
          font-size: 24px;
          color: #1e293b;
          margin: 0 0 10px 0;
        }

        .empty-state p {
          color: #64748b;
          font-size: 16px;
          margin: 0 0 30px 0;
        }

        .back-button {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(59, 130, 246, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .results-container {
            padding: 16px;
          }
          
          .properties-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .results-title {
            font-size: 24px;
          }
          
          .property-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .property-actions {
            flex-direction: column;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ResultsPage;