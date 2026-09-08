import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import AuthProvider from "./context/AuthContext";

import "./index.css";
import "./styles/Global.css";
import "./styles/Login.css";
import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Footer.css";
import "./styles/Loader.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);