import React from 'react';
import { useAuth } from '../AuthContext';

const DashboardPage = () => {
  const { user, hasPermission, getAuthHeaders } = useAuth();
  const tokenExpiresAt = user?.claims?.exp
    ? new Date(user.claims.exp * 1000).toLocaleString()
    : 'Unknown';
  const authHeader = getAuthHeaders();

  return (
    <div className="page-card">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}!</p>
      <p>Your role: {user?.role}</p>

      <div className="permissions-panel">
        <h3>Available actions</h3>
        <ul>
          {hasPermission('manage-users') && <li>Manage users</li>}
          {hasPermission('edit-content') && <li>Edit content</li>}
          {hasPermission('view-content') && <li>View content</li>}
          {!hasPermission('manage-users') && !hasPermission('edit-content') && (
            <li>Read-only access</li>
          )}
        </ul>
      </div>

      <div className="token-panel">
        <h3>Token-based session</h3>
        <p>This app stores a mock JWT in <strong>localStorage</strong> and sends it with protected requests.</p>
        <p>
          <strong>Expires at:</strong> {tokenExpiresAt}
        </p>
        <pre className="token-box">{user?.token}</pre>
        <pre className="token-box">{JSON.stringify(authHeader, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DashboardPage;
