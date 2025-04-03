import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get("/api/session", { withCredentials: true });
        if (res.data.status === 200) {
          setIsLogin(true);
          setUserName(res.data.data.user.userName);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("userName", res.data.data.user.userName);
        } else {
          setIsLogin(false);
          setUserName("");
          localStorage.removeItem("isLogin");
          localStorage.removeItem("userName");
        }
      } catch (error) {
        setIsLogin(false);
        setUserName("");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userName");
      }
    };

    checkUserSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
