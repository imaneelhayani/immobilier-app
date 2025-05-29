import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setSuccess(false);
        if (data.errors) setErrors(data.errors);
        else if (data.error) setMessage(data.error);
        else setMessage('Une erreur inconnue est survenue');
      } else {
        setSuccess(true);
        setMessage('Connexion réussie');

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'admin') {
          navigate('/dashboard');
        } else {
          if (propertyId) {
            navigate(`/commandes?propertyId=${propertyId}`);
          } else {
            navigate('/');
          }
        }
      }
    } catch (error) {
      setSuccess(false);
      setMessage('Erreur de connexion : ' + error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#0d6efd',
      fontWeight: '700',
      fontSize: '1.8rem',
    },
    message: {
      textAlign: 'center',
      marginBottom: '15px',
      color: success ? '#198754' : '#dc3545',
      fontWeight: '600',
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
    registerText: {
      marginTop: '15px',
      textAlign: 'center',
      fontSize: '0.9rem',
    },
    registerLink: {
      color: '#0d6efd',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Connexion</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="submit" style={styles.button}>Se connecter</button>
      </form>

      <p style={styles.registerText}>
        Pas de compte ?
        <Link to="/register" style={styles.registerLink}>Inscrivez-vous ici</Link>
      </p>
    </div>
  );
}

export default Login;
