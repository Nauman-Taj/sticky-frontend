import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <h1> Sticky Notes</h1>
      {user && (
        <div className="nav-actions">
          <span>Welcome {user.name}</span>
          <button className="btn btn-outline" onClick={logout}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
