import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

function Auth() {
  const { user, login, signup, loading, logout, error } = useAuth();
  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      const from = location.state?.from || "/"; // <--- FIXED
      nav(from, { replace: true }); // <--- FIXED
    }
  }, [user, nav]);
  const [isLogin, setIsLogin] = useState(true);
  function handleSubmit(e) {
    e.preventDefault();
    const enteredData = new FormData(e.target);
    const extractedData = Object.fromEntries(enteredData.entries());
    if (isLogin) {
      login(extractedData);
    } else {
      signup(extractedData);
    }
  }
  return (
    <div className="container">
      <form className="auth_form from" onSubmit={handleSubmit}>
        <h1>{isLogin ? "LOGIN" : "SIGN-UP"}</h1>
        {!isLogin ? (
          <input type="text" placeholder="name" name="name" />
        ) : (
          <></>
        )}
        <input type="text" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        {error ? <p className="error">{error}</p> : <></>}
        <button disabled={loading}>
          {" "}
          {loading ? "loading..." : <>{isLogin ? "Login" : "Sign-up"}</>}{" "}
        </button>
        <p>
          {isLogin ? (
            <>
              Don't have a account{" "}
              <span onClick={() => setIsLogin(false)}>create one</span>
            </>
          ) : (
            <>
              Already have a account?{" "}
              <span onClick={() => setIsLogin(true)}> login</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default Auth;
