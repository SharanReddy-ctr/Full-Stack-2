import React from 'react';

const AdminPage = () => (
  <div className="page-card">
    <h2>Admin Panel</h2>
    <p>Only Admin users can access this page and manage sensitive application settings.</p>
    <ul>
      <li>Manage users</li>
      <li>View audit logs</li>
      <li>Change role permissions</li>
    </ul>
  </div>
);

export default AdminPage;
