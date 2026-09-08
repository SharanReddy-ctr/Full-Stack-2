import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="page-container">
      <div className="role-card">
        <h1>Access Denied</h1>

        <p>You don't have permission to access this page.</p>

        <Link to="/dashboard">
          <button className="back-btn">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;