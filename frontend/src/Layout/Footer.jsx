// src/components/Footer.jsx
import React from 'react';
import '../Styles/Footer.css';

function Footer() {
  return (
     <footer>
      <p>© {new Date().getFullYear()} Tous droits réservés - Votre partenaire de confiance en gestion immobilière.</p>
      <p>
        Nous offrons une plateforme complète pour faciliter la gestion de vos biens immobiliers, 
        simplifier les transactions et connecter propriétaires, locataires et acheteurs en toute confiance.
      </p>
    </footer>
  );
}

export default Footer;
