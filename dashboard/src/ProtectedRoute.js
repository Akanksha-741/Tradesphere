import React, { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsAuthenticated(Boolean(response.data.user));
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.replace(
  "https://tradesphere-frontend-one.vercel.app/login"
);}
  }, [loading, isAuthenticated]);

  if (loading || !isAuthenticated) {
    return <p>Checking authentication...</p>;
  }

  return children;
}

export default ProtectedRoute; 