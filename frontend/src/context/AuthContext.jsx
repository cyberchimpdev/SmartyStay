import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async ({ username, password }) => {
    const res = await api.post("login/", { username, password });
    localStorage.setItem("token", res.data.access);
    const u = { username: res.data.username, role: res.data.role };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    return u;
  };

  const register = async ({ username, email, password }) => {
    await api.post("register/", {
      username,
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      landingPath: user?.role === "admin" ? "/admin" : "/customer",
      login,
      register,
      logout,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
