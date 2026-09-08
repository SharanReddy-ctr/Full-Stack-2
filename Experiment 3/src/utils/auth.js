// Save user in localStorage
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get logged-in user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Save JWT token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove authentication data
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Check login status
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};