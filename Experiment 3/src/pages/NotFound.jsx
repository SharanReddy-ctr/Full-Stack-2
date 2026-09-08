import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-container">
      <div className="role-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>The page you are looking for does not exist.</p>

        <Link to="/">
          <button className="back-btn">
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;