import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import EditorPage from './pages/EditorPage';
import ViewerPage from './pages/ViewerPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

const App = () => {
  const { user, logout, hasPermission } = useAuth();

  return (
    <div className="app-shell">
      <header>
        <h1>RBAC React App</h1>
        <nav>
          {hasPermission('dashboard') && <Link to="/dashboard">Dashboard</Link>}
          {hasPermission('manage-users') && <Link to="/admin">Admin</Link>}
          {hasPermission('edit-content') && <Link to="/editor">Editor</Link>}
          {hasPermission('view-content') && <Link to="/viewer">Viewer</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && (
            <>
              <span className="user-badge">
                {user.username} ({user.role})
              </span>
              <button type="button" onClick={logout} className="link-button">
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}> 
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route element={<ProtectedRoute permission="manage-users" />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route element={<ProtectedRoute permission="edit-content" />}>
            <Route path="/editor" element={<EditorPage />} />
          </Route>

          <Route element={<ProtectedRoute permission="view-content" />}>
            <Route path="/viewer" element={<ViewerPage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
