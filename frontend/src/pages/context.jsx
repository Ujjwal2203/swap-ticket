import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userName, setUserName  }}>
      {children}
    </AuthContext.Provider>
  );
};
