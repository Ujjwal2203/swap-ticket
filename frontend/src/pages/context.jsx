import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  // Helper to clear auth state
  const clearAuth = () => {
    setIsLogin(false);
    setUserName("");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userName");
  };

  const checkUserSession = async () => {
    try {
      const res = await axios.get("http://localhost:8000/auth/session", {
        withCredentials: true,
      });
      // console.log("SESSION", re .session);

      if (res.data.status === 200) {
        const name = res.data.data.user.userName;
        setIsLogin(true);
        setUserName(name);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userName", name);
      } else {
        clearAuth();
      }
    } catch (error) {
      clearAuth();
      toast.error("Session expired. Please log in again.");
      // console.log("SESSION", req.session);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userName,
        setUserName,
        refreshSession: checkUserSession,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
