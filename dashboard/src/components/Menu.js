import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./menu.css";
const API_URL = "https://tradesphere-backend-7kg3.onrender.com/api/auth";

const Menu = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);

  const location = useLocation();

  // Reference to the complete profile section
  const profileRef = useRef(null);

  // Fetch logged-in user's details
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          withCredentials: true,
        });

        console.log("User data:", response.data.user);

        setUser(response.data.user || null);
      } catch (error) {
        console.error(
          "Unable to fetch user session:",
          error.response?.data || error.message
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Close dropdown when navigating to another page
  useEffect(() => {
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  // Generate avatar initials
  const getInitials = () => {
    if (user?.fullName) {
      return user.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }

    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "ZU";
  };

  // Highlight the active menu item
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  // Toggle profile dropdown
  const handleProfileClick = () => {
    setIsProfileDropdownOpen((previous) => !previous);
  };

  // Support keyboard interaction
  const handleProfileKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleProfileClick();
    }

    if (event.key === "Escape") {
      setIsProfileDropdownOpen(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      setIsProfileDropdownOpen(false);

      // Redirect to the frontend login page
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error("Logout failed:", error);

      alert("Unable to log out. Please try again.");
    }
  };

  return (
    <div className="menu-container">
      {/* Logo */}
      <img
        src="logo.png"
        alt="Zerodha Logo"
        style={{ width: "50px" }}
      />

      <div className="menus">
        {/* Navigation Menu */}
        <ul>
          <li>
            <Link to="/">
              <p className={isActive("/") ? "menu selected" : "menu"}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link to="/orders">
              <p
                className={
                  isActive("/orders") ? "menu selected" : "menu"
                }
              >
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link to="/holdings">
              <p
                className={
                  isActive("/holdings") ? "menu selected" : "menu"
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link to="/positions">
              <p
                className={
                  isActive("/positions") ? "menu selected" : "menu"
                }
              >
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link to="/funds">
              <p
                className={
                  isActive("/funds") ? "menu selected" : "menu"
                }
              >
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link to="/apps">
              <p
                className={
                  isActive("/apps") ? "menu selected" : "menu"
                }
              >
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* Profile Section */}
        <div className="profile-wrapper" ref={profileRef}>
          {/* Profile Toggle */}
          <button
            type="button"
            className="profile"
            onClick={handleProfileClick}
            onKeyDown={handleProfileKeyDown}
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="true"
            aria-label="Open profile menu"
          >
            <div className="avatar">{getInitials()}</div>

            <p className="username">
              {loading
                ? "Loading..."
                : user?.fullName || user?.email || "Guest"}
            </p>

            <span className="dropdown-arrow">
              {isProfileDropdownOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <div className="profile-avatar-large">
                  {getInitials()}
                </div>

                <p className="profile-name">
                  {loading
                    ? "Loading..."
                    : user?.fullName || "User"}
                </p>

                <p className="profile-email">
                  {user?.email || "No email available"}
                </p>

                <p className="profile-id">
                  User ID:{" "}
                  {user?.id ||
                    user?._id ||
                    user?.userId ||
                    "Not available"}
                </p>
              </div>

              <hr />

              {/* Logout Button */}
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;