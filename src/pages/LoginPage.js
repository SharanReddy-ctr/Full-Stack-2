import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const { login, roles } = useAuth();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(roles.VIEWER);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username: username.trim() || 'guest', role });
    navigate(from, { replace: true });
  };

  return (
    <div className="page-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={roles.ADMIN}>Admin</option>
            <option value={roles.EDITOR}>Editor</option>
            <option value={roles.VIEWER}>Viewer</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
