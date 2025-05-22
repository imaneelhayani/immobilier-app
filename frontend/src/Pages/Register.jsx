import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data);
      } else {
        setMessage(data.message);
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Register New User</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{color: 'red'}}>{errors.name[0]}</p>}
        </div>

        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{color: 'red'}}>{errors.email[0]}</p>}
        </div>

        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p style={{color: 'red'}}>{errors.password[0]}</p>}
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
