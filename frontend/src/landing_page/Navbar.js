import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      navigate("/");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/Media/images/logo.svg"
            alt="Zerodha Logo"
            style={{ width: "25%" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>

            {!loading && !user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

           {!loading && user && (
  <>
    <li className="nav-item">
      <span className="nav-link">
        Hi, {user.fullName}
      </span>
    </li>

    <li className="nav-item">
      <a
        className="nav-link"
       href="https://tradesphere-dashboard-three.vercel.app"
      >
        Dashboard
      </a>
    </li>

    <li className="nav-item">
      <button
        className="nav-link btn"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  </>
)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;