import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role.");
      return;
    }

    const success = login(email, password, role);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials or selected role.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>JWT RBAC</h1>

        <p className="login-subtitle">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          <label>Select Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
            required
          >
            <option value="">
              -- Select Role --
            </option>

            <option value="Admin">
              Admin
            </option>

            <option value="Editor">
              Editor
            </option>

            <option value="Viewer">
              Viewer
            </option>
          </select>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <div className="demo-text">
          Choose your role and enter the corresponding
          login credentials.
        </div>

      </div>
    </div>
  );
}

export default Login;