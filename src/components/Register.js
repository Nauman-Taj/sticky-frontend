import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PassEye from "./PassEye";

export default function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setErrors({});

    try {
      await register(name, email, password);
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        const fieldErrors = {};

        data.errors.forEach((item) => {
          fieldErrors[item.field] = item.message;
        });

        setErrors(fieldErrors);
      } else {
        setError(data?.message || "Registration failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create your account</h2>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>Name</label>

            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
            />

            {errors.name && (
              <small className="field-error">{errors.name}</small>
            )}
          </div>

          <div className="field">
            <label>Email</label>

            <input
              type="email"
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

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}