import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth } from "../AuthContext";

function Login() {
    const { checkSession } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);


   try {
  await axios.post(
    "http://localhost:3002/api/auth/login",
    {
      email: formData.email.trim(),
      password: formData.password,
    },
    {
      withCredentials: true,
    }
  );

  await checkSession();
  navigate("/");
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Unable to log in. Please try again."
  );
} finally {
  setLoading(false);
}






  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <h2 className="text-center mb-2">Welcome Back!</h2>

              <p className="text-muted text-center mb-4">
                Log in to your Zerodha account.
              </p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{" "}
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;