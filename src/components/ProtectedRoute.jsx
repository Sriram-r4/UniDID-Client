import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return auth ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
