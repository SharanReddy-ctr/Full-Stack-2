import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_TOKEN_KEY = 'rbac_auth_token';

const roles = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
};

const rolePermissions = {
  Admin: ['dashboard', 'manage-users', 'edit-content', 'view-content'],
  Editor: ['dashboard', 'edit-content', 'view-content'],
  Viewer: ['dashboard', 'view-content'],
};

const encodeJwtPart = (value) => btoa(JSON.stringify(value));
const decodeJwtPart = (value) => JSON.parse(atob(value));

const createMockJwtToken = ({ username, role }) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    username,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  const encodedHeader = encodeJwtPart(header);
  const encodedPayload = encodeJwtPart(payload);
  const signature = btoa(`${encodedHeader}.${encodedPayload}.secret`);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

const decodeToken = (token) => {
  const parts = token?.split('.');
  if (parts?.length !== 3) return null;

  try {
    return decodeJwtPart(parts[1]);
  } catch {
    return null;
  }
};

const isTokenValid = (token) => {
  const parts = token?.split('.');
  if (parts?.length !== 3) return false;

  const expectedSignature = btoa(`${parts[0]}.${parts[1]}.secret`);
  if (expectedSignature !== parts[2]) return false;

  const payload = decodeToken(token);
  return payload?.exp > Math.floor(Date.now() / 1000);
};

const buildUserFromToken = (token) => {
  const claims = decodeToken(token);
  if (!claims) return null;
  return {
    username: claims.username,
    role: claims.role,
    token,
    claims,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return;
    if (!isTokenValid(token)) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return;
    }

    const loadedUser = buildUserFromToken(token);
    if (loadedUser) {
      setUser(loadedUser);
    }
  }, []);

  const login = ({ username, role }) => {
    const token = createMockJwtToken({ username, role });
    const loggedUser = buildUserFromToken(token);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) ?? false;
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        hasPermission,
        getAuthHeaders,
        roles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
