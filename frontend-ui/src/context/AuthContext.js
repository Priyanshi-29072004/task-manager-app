import React, { createContext, useState } from "react";
import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials); // calls API
      setUser(response.data); // set user data
    } catch (error) {
      console.error(
        "Context login error:",
        error.response?.data || error.message
      );
      throw error; // pass to Login component
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
