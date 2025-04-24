import React, { useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";

function Protection({ children }) {
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (!user) {
      nav("/auth");
    }
  }, [user, nav]);

  if (!user) {
    return null; // Prevent rendering the children while redirecting
  }
  return <>{children}</>;
}

export default Protection;
