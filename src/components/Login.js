import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PassEye from './PassEye';


export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setErrors({});

    try {
      await login(email, password);
    } catch (err) {
       const data = err.response?.data;

      if (data?.errors) {
        const fieldErrors = {};

        data.errors.forEach((item) => {
          fieldErrors[item.field] = item.message;
        });

        setErrors(fieldErrors);
      } else {
        setError(data?.message || "Login failed");
      }
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome</h2>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />

            {errors.email && (
              <small className="field-error">{errors.email}</small>
            )}
          </div>
          <div className="field">
            <label>Password</label>
            <PassEye
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />

            {errors.password && (
              <small className="field-error">{errors.password}</small>
            )}
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
