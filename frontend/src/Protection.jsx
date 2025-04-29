import React, { useEffect, useMemo } from "react";
import { useAuth } from "./context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

function Protection({ children }) {
  const { user, checkingCookie } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  // Capture pathname once to prevent it changing on each render
  const pathname = useMemo(() => location.pathname, []);

  useEffect(() => {
    if (checkingCookie) return;
    if (!user) {
      nav("/auth", { state: { from: pathname } });
    }
  }, [user, checkingCookie, nav, pathname]);

  if (checkingCookie) {
    return <div>checking cookies ...</div>;
  }

  if (!user) {
    return null; // Prevent rendering the children while redirecting
  }

  return <>{children}</>;
}

export default Protection;
