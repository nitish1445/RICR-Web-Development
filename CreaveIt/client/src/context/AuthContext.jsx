import React, { useEffect, useState, useContext } from "react";
import api from "../config/Api"; // apne api path ke according change kar lena

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("CraveItUser");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user?.role || "");

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user?.role || "");

    // User state change hone par storage bhi sync rahe
    if (user) {
      sessionStorage.setItem("CraveItUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("CraveItUser");
    }
  }, [user]);

  // Login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Logout error:",
        error?.response?.data?.message || error.message,
      );
    } finally {
      setUser(null);
      setIsLogin(false);
      setRole("");
      sessionStorage.removeItem("CraveItUser");
    }
  };

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    role,
    setRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
