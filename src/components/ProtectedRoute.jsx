import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from "./../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refrestToken = async () => {
    const refrestToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/accounts/api/token/refresh/", {
        refrest: refrestToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        const decoded = jwtDecode(res.data.access);
        setUserRole(decoded.role);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    console.log(decoded.role);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await refrestToken();
    } else {
      setUserRole(decoded.role);
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (isAuthorized && (!requiredRole || requiredRole === userRole)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
