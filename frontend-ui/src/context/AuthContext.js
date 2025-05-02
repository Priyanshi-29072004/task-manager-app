import React, { createContext, useState } from "react";
import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage when the app starts
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      // Save user to localStorage and state
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      console.error("Context login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    // Clear user from localStorage and state
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
