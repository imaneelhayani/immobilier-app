import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // هادي باش نعرف إذا نجاح ولا خطأ

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
    setSuccess(false); // نرجعوها false قبل الطلب

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setSuccess(false);
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.error) {
          setMessage(data.error);
        } else {
          setMessage('حدث خطأ غير معروف');
        }
      } else {
        setSuccess(true);
        setMessage(data.message);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // window.location.href = '/dashboard';
      }
    } catch (error) {
      setSuccess(false);
      setMessage('خطأ في الاتصال: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* رسالة النجاح أو الخطأ العامة */}
      {message && (
        <p style={{ color: success ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
