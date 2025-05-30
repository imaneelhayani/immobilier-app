import React, { useState, useEffect } from 'react';

function About() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionHover = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>À propos de Nous</h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>
            Votre partenaire de confiance pour trouver la maison de vos rêves
          </p>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.grid}>
          <section 
            style={{
              ...styles.section,
              ...(activeSection === 'mission' ? styles.sectionActive : {})
            }}
            onMouseEnter={() => handleSectionHover('mission')}
            onMouseLeave={handleSectionLeave}
          >
            <div style={styles.sectionHeader}>
              <div style={{...styles.iconContainer, ...styles.missionIcon}}>
                <span style={styles.icon}>🎯</span>
              </div>
              <h2 style={styles.sectionTitle}>Notre Mission</h2>
            </div>
            <p style={styles.sectionText}>
              Nous aidons nos clients à acheter, vendre et louer des propriétés avec
              transparence, professionnalisme et un service personnalisé.
              Notre équipe dédiée met tout en œuvre pour faciliter vos démarches immobilières.
            </p>
          </section>

          <section 
            style={{
              ...styles.section,
              ...(activeSection === 'history' ? styles.sectionActive : {})
            }}
            onMouseEnter={() => handleSectionHover('history')}
            onMouseLeave={handleSectionLeave}
          >
            <div style={styles.sectionHeader}>
              <div style={{...styles.iconContainer, ...styles.historyIcon}}>
                <span style={styles.icon}>🏢</span>
              </div>
              <h2 style={styles.sectionTitle}>Notre Histoire</h2>
            </div>
            <p style={styles.sectionText}>
              Fondée en 2010, notre agence immobilière a grandi pour devenir l'une des plus
              respectées de la région. Avec des années d'expérience et une connaissance approfondie
              du marché local, nous accompagnons nos clients à chaque étape.
            </p>
          </section>

          <section 
            style={{
              ...styles.section,
              ...(activeSection === 'team' ? styles.sectionActive : {})
            }}
            onMouseEnter={() => handleSectionHover('team')}
            onMouseLeave={handleSectionLeave}
          >
            <div style={styles.sectionHeader}>
              <div style={{...styles.iconContainer, ...styles.teamIcon}}>
                <span style={styles.icon}>👨‍💼</span>
              </div>
              <h2 style={styles.sectionTitle}>Notre Équipe</h2>
            </div>
            <p style={styles.sectionText}>
              Notre équipe est composée d'experts passionnés, allant des agents immobiliers
              aux spécialistes du financement et du juridique, tous dédiés à votre réussite.
            </p>
          </section>

          <section 
            style={{
              ...styles.section,
              ...(activeSection === 'contact' ? styles.sectionActive : {})
            }}
            onMouseEnter={() => handleSectionHover('contact')}
            onMouseLeave={handleSectionLeave}
          >
            <div style={styles.sectionHeader}>
              <div style={{...styles.iconContainer, ...styles.contactIcon}}>
                <span style={styles.icon}>📱</span>
              </div>
              <h2 style={styles.sectionTitle}>Contactez-Nous</h2>
            </div>
            <p style={styles.sectionText}>
              Vous avez des questions ? N'hésitez pas à nous contacter par téléphone ou par email.
              Nous serons ravis de vous aider !
            </p>
            <button style={styles.contactButton}>
              Prendre Contact
            </button>
          </section>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>15+</h3>
            <p style={styles.statLabel}>Années d'expérience</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>500+</h3>
            <p style={styles.statLabel}>Clients satisfaits</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>1000+</h3>
            <p style={styles.statLabel}>Propriétés vendues</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>24/7</h3>
            <p style={styles.statLabel}>Support client</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '80px 0 60px',
    borderBottom: '1px solid #e2e8f0',
    position: 'relative',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '16px',
    letterSpacing: '-0.025em',
  },
  titleUnderline: {
    width: '80px',
    height: '4px',
    backgroundColor: '#3b82f6',
    margin: '0 auto 24px',
    borderRadius: '2px',
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
    color: '#64748b',
    fontWeight: '400',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginBottom: '80px',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    height: 'fit-content',
  },
  sectionActive: {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderColor: '#3b82f6',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  iconContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    flexShrink: 0,
  },
  missionIcon: {
    backgroundColor: '#dbeafe',
  },
  historyIcon: {
    backgroundColor: '#dcfce7',
  },
  teamIcon: {
    backgroundColor: '#fef3c7',
  },
  contactIcon: {
    backgroundColor: '#fce7f3',
  },
  icon: {
    fontSize: '24px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0',
    lineHeight: '1.3',
  },
  sectionText: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#475569',
    margin: '0',
    fontWeight: '400',
  },
  contactButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '24px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    backgroundColor: '#ffffff',
    padding: '48px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#3b82f6',
    margin: '0 0 8px 0',
  },
  statLabel: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: '0',
    fontWeight: '500',
  },
};

// Ajouter les effets de survol pour le bouton
if (typeof document !== 'undefined') {
  setTimeout(() => {
    const button = document.querySelector('button');
    if (button) {
      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#2563eb';
        button.style.transform = 'translateY(-1px)';
        button.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#3b82f6';
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
      });
    }
  }, 100);
}

export default About;