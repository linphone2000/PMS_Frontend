import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  // const [currentEmployee, setcurrentEmployee] = useState({
  //   name: "Lin Phone",
  //   email: "linphonem@gmail.com",
  //   role: "managerAdmin",
  // });
  const [currentEmployee, setcurrentEmployee] = useState();

  // Fetch logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentEmployee");
    if (storedUser) {
      setcurrentEmployee(JSON.parse(storedUser));
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

  // Logout

  // Memo
  const authContextValue = useMemo(
    () => ({
      currentEmployee,
      register,
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
