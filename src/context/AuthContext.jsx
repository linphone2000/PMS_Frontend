import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [currentEmployee, setCurrentEmployee] = useState();

  // Fetch logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentEmployee");
    if (storedUser) {
      setCurrentEmployee(JSON.parse(storedUser));
    }
  }, []);

  // Handlers
  // Register
  const register = async (userData) => {
    try {
      const { email, password, name, role } = userData;
      const response = await axios.post(API_URL + "/users/register", {
        email,
        password,
        name,
        role,
      });
      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  // Login
  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const response = await axios.post(API_URL + "/users/login", {
        email,
        password,
      });
      if (response.status == 200) {
        const user = response.data.user;
        setCurrentEmployee(user);
        localStorage.setItem("currentEmployee", JSON.stringify(user));
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setCurrentEmployee(null);
    localStorage.removeItem("currentEmployee");
  };

  // Memo
  const authContextValue = useMemo(
    () => ({
      currentEmployee,
      register,
      login,
      logout,
    }),
    [currentEmployee]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
