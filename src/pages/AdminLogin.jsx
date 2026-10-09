import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      if (!token) {
        setError("Login response-la token kidaikkala.");
        return;
      }

      localStorage.setItem("adminToken", token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Email and password check pannunga."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/" className="admin-login-brand">
          ✦ ResearchLab
        </Link>

        <div className="admin-login-heading">
          <span className="admin-login-icon">🔐</span>
          <h1>Admin Login</h1>
          <p>Sign in to manage your research website.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="admin-login-field">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In to Dashboard →"}
          </button>
        </form>

        <p className="admin-login-footer">
          Authorized administrators only
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

