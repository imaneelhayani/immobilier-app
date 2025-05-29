import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');

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
        setErrors(data.errors || {});
        setMessage(data.message || 'Erreur');
      } else {
        setSuccess(true);
        setMessage('Inscription réussie !');
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });

        setTimeout(() => {
          // ✅ redirection avec propertyId si كاين
          if (propertyId) {
            navigate(`/login?propertyId=${propertyId}`);
          } else {
            navigate('/login');
          }
        }, 2000);
      }
    } catch (error) {
      setMessage('Erreur : ' + error.message);
    }
  };

  // ... rest of the component stays the same (styles + form rendering)
const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ced4da',
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
    },
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inscription</h2>
      {message && (
        <p style={success ? styles.messageSuccess : styles.messageError}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" style={styles.label}>Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.name ? styles.inputError : {})
            }}
            placeholder="Votre nom complet"
          />
          {errors.name && <p style={styles.errorText}>{errors.name[0]}</p>}
        </div>

        <div>
          <label htmlFor="email" style={styles.label}>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.email ? styles.inputError : {})
            }}
            placeholder="exemple@exemple.com"
          />
          {errors.email && <p style={styles.errorText}>{errors.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="password" style={styles.label}>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.password ? styles.inputError : {})
            }}
            placeholder="********"
          />
          {errors.password && <p style={styles.errorText}>{errors.password[0]}</p>}
        </div>

        <div>
          <label htmlFor="password_confirmation" style={styles.label}>Confirmation :</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.password_confirmation ? styles.inputError : {})
            }}
            placeholder="********"
          />
          {errors.password_confirmation && <p style={styles.errorText}>{errors.password_confirmation[0]}</p>}
        </div>

        <button type="submit" style={styles.button}>S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
