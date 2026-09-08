// Generate Mock JWT Token
export const generateMockToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    issuedAt: new Date().toISOString(),
  };

  return btoa(JSON.stringify(payload));
};

// Decode Mock JWT Token
export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    console.error("Invalid Token");
    return null;
  }
};