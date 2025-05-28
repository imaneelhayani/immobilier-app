import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage('');
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || data);
      } else {
        setSuccess(true);
        setMessage(data.message || 'Inscription réussie !');

        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });

        // Redirection après 2 secondes vers login
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMessage('Erreur : ' + error.message);
    }
  };

  // Styles simples et modernes
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#0d6efd',
      fontWeight: '700',
      fontSize: '1.8rem',
    },
    messageSuccess: {
      color: '#198754',
      fontWeight: '600',
      marginBottom: '15px',
      textAlign: 'center',
    },
    messageError: {
      color: '#dc3545',
      fontWeight: '600',
      marginBottom: '15px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ced4da',
      fontSize: '1rem',
      outlineColor: '#0d6efd',
      transition: 'border-color 0.3s',
    },
    inputError: {
      borderColor: '#dc3545',
      backgroundColor: '#f8d7da',
    },
    errorText: {
      color: '#dc3545',
      marginTop: '-8px',
      marginBottom: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      fontWeight: '700',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#084cd6',
    },
  };

  // Hover button state
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inscription Nouvel Utilisateur</h2>

      {message && (
        <p style={success ? styles.messageSuccess : styles.messageError}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label style={styles.label} htmlFor="name">Nom:</label>
          <input
            type="text"
            name="name"
            id="name"
            style={{
              ...styles.input,
              ...(errors.name ? styles.inputError : {})
            }}
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom complet"
          />
          {errors.name && <p style={styles.errorText}>{errors.name[0]}</p>}
        </div>

        <div>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            style={{
              ...styles.input,
              ...(errors.email ? styles.inputError : {})
            }}
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@exemple.com"
          />
          {errors.email && <p style={styles.errorText}>{errors.email[0]}</p>}
        </div>

        <div>
          <label style={styles.label} htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            name="password"
            id="password"
            style={{
              ...styles.input,
              ...(errors.password ? styles.inputError : {})
            }}
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
          {errors.password && <p style={styles.errorText}>{errors.password[0]}</p>}
        </div>

        <div>
          <label style={styles.label} htmlFor="password_confirmation">Confirmer le mot de passe:</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            style={styles.input}
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
