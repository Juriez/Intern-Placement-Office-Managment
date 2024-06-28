import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, getUser } from '../../api/authentication.api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'admin') {
      navigate('/ipoc-dashboard');
    } else if (user === 'student') {
      navigate('/stu_dashboard');
    } else if (user === 'company_manager') {
      navigate('/company-dashboard');
    } else {
      console.error('Invalid access token:', user);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error('Email and password are required.');
      return;
    }
    try {
      const res = await login({ email, password });
      console.log('Log in ', res);
      localStorage.setItem('accessToken', res);

      // User info
      const info = await getUser();
      console.log(info, "infoooooooooooooo");
      localStorage.setItem('userId', info.data._id);
      localStorage.setItem('userType', info.data.userType);

      navigate('/stu_dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#f0f0f0',
    lineHeight: '1.6',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#66fcf1',
    marginBottom: '20px',
  };

  const labelStyle = {
    color: '#45a29e',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #45a29e',
    borderRadius: '4px',
    backgroundColor: '#0b0c10',
    color: '#f0f0f0',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff',
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '10px',
  };

  const linkStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#343a40',
    color: '#66fcf1',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '10px',
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#1f2833', minHeight: '100vh' }}>
      <div style={containerStyle}>
        <h2 style={headerStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success rounded-0" style={buttonStyle}>
            Login
          </button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/registration-type" style={linkStyle}>
          Sign Up
        </Link>
        {/* <Link to="/forgot-password" className="btn btn-link" style={{ display: 'block', textAlign: 'center', marginTop: '10px', color: '#66fcf1' }}>
          Forgot Password?
        </Link> */}
      </div>
    </div>
  );
}

export default Login;