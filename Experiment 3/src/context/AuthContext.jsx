import { createContext, useEffect, useState } from "react";
import {
  saveUser,
  saveToken,
  getUser,
  getToken,
  logoutUser,
} from "../utils/auth";

import { loginUser } from "../utils/fakeApi";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    const storedToken = getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (email, password, role) => {
    const response = loginUser(email, password, role);

    if (!response.success) {
      return false;
    }

    saveUser(response.user);
    saveToken(response.token);

    setUser(response.user);
    setToken(response.token);

    return true;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;