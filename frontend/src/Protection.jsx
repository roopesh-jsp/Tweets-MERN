import React, { useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

function Protection({ children }) {
  const { user, checkingCookie } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (checkingCookie) return;
    if (!user) {
      nav("/auth", { state: { from: location.pathname } });
    }
  }, [user, nav, checkingCookie, location]);

  if (checkingCookie) {
    return <div>checking cookies ...</div>;
  }

  if (!user) {
    return null; // Prevent rendering the children while redirecting
  }
  return <>{children}</>;
}

export default Protection;
