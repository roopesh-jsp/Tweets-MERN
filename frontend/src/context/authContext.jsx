import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  error: "",
  setErrors: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
  getUser: () => {},
  checkingCookie: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [checkingCookie, setCheckingCookie] = useState(false);
  const getUser = async () => {
    setCheckingCookie(true);
    try {
      const { data } = await axios.get("http://localhost:3000/auth/get-me", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
    setCheckingCookie(false);
  };

  useEffect(() => {
    getUser();
  }, []);
  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      //setting data and errors
      if (data.success) {
        setUser(data.user);
        setErrors(null);
      } else {
        setErrors(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.message);
      } else {
        setErrors("Something went wrong. Please try again.");
      }
    }
  };

  const signup = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/sign-up",
        credentials,
        {
          withCredentials: true,
        }
      );

      //setting data and errors
      if (data.success) {
        setUser(data.user);
        setErrors(null);
      } else {
        setErrors(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.message);
      } else {
        setErrors("Something went wrong. Please try again.");
      }
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const ctxVal = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setErrors,
    login,
    signup,
    logout,
    checkingCookie,
    getUser,
  };
  return <AuthContext.Provider value={ctxVal}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
