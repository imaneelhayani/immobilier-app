// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      <p>© {new Date().getFullYear()} NeuralBox - جميع الحقوق محفوظة</p>
    </footer>
  );
}

export default Footer;
