import { generateMockToken } from "./jwt";

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "Admin",
  },
  {
    id: 2,
    name: "Editor User",
    email: "editor@gmail.com",
    password: "editor123",
    role: "Editor",
  },
  {
    id: 3,
    name: "Viewer User",
    email: "viewer@gmail.com",
    password: "viewer123",
    role: "Viewer",
  },
];

export const loginUser = (email, password, role) => {
  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      u.role === role
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials or role",
    };
  }

  const token = generateMockToken(user);

  return {
    success: true,
    user,
    token,
  };
};

export const logoutUser = () => {
  return {
    success: true,
    message: "Logged out successfully",
  };
};