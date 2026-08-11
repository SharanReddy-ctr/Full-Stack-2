import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => (
  <div className="page-card">
    <h2>Access Denied</h2>
    <p>You do not have permission to view this page.</p>
    <Link to="/dashboard">Return to Dashboard</Link>
  </div>
);

export default UnauthorizedPage;
