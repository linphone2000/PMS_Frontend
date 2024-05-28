import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [currentEmployee, setCurrentEmployee] = useState();
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);

  // Fetch logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentEmployee");
    if (storedUser) {
      setCurrentEmployee(JSON.parse(storedUser));
    }
  }, []);

  // Fetch all users
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(API_URL + "/users/");
      if (response.status == 200) {
        setAllEmployees(response.data.users);
        setEmployeesLoading(false);
      } else {
        setAllEmployees([]);
        setEmployeesLoading(false);
      }
    };
    getAllUsers();
  }, [currentEmployee]);

  // Handlers
  // Register
  const register = async (userData) => {
    try {
      const { email, password, name, employeeID } = userData;
      const response = await axios.post(API_URL + "/users/register", {
        email,
        password,
        name,
        employeeID,
      });
      return response;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error registering user");
      }
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

  // Update
  const updateEmployee = async (userData) => {
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    try {
      const response = await axios.put(
        API_URL + "/users/" + userData.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        fetchUserById(userData.id);
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

  // Re-Fetch user after updating
  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(API_URL + "/users/" + id);
      if (response.status == 200) {
        const user = response.data.user;
        setCurrentEmployee(user);
        localStorage.setItem("currentEmployee", JSON.stringify(user));
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  // Memo
  const authContextValue = useMemo(
    () => ({
      currentEmployee,
      register,
      login,
      updateEmployee,
      allEmployees,
      employeesLoading,
      logout,
    }),
    [currentEmployee, employeesLoading]
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
