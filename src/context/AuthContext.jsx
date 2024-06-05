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
  const [employeeTableChanged, setEmployeeTableChanged] = useState(false);

  // Fetch logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentEmployee");
    if (storedUser) {
      setCurrentEmployee(JSON.parse(storedUser));
    }
  }, []);

  // Fetch all users
  useEffect(() => {
    const getAllUsers = async () => {
      setAllEmployees([]);
      try {
        const response = await axios.get(API_URL + "/users/");
        if (response.status === 200) {
          setAllEmployees(response.data.users);
        } else {
          setAllEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllEmployees([]);
      } finally {
        setEmployeesLoading(false);
      }
    };
    getAllUsers();
  }, [employeeTableChanged]);

  // Handlers
  // Register
  const register = async (userData) => {
    try {
      const response = await axios.post(API_URL + "/users/register", userData);
      setEmployeeTableChanged((prev) => !prev);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
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
      if (response.status === 200) {
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

  // Request Code
  const requestCode = async (email) => {
    try {
      const response = await axios.post(API_URL + "/users/request-code", {
        email,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error getting code");
      }
    }
  };

  // Validate Code
  const validateCode = async (email, code) => {
    try {
      const response = await axios.post(API_URL + "/users/validate-code", {
        email,
        code,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error validating code");
      }
    }
  };

  // Reset Password
  const resetPassword = async (email, password, code) => {
    try {
      const response = await axios.post(API_URL + "/users/reset-password", {
        email,
        password,
        code,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error resetting password");
      }
    }
  };

  // Update self
  const updateEmployee = async (userData) => {
    try {
      const response = await axios.put(
        API_URL + "/users/" + userData.get("_id"),
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        fetchUserById(userData.get("_id"));
        return response;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Update others
  const updateEmployees = async (userData) => {
    try {
      const response = await axios.put(
        API_URL + "/users/" + userData.get("_id"),
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEmployeeTableChanged((prev) => !prev);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      setEmployeeTableChanged((prev) => !prev);
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error updating user");
      }
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/users/" + id);
      if (response.status === 200) {
        setEmployeeTableChanged((prev) => !prev);
        return response;
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setCurrentEmployee(null);
    localStorage.removeItem("currentEmployee");
    setEmployeeTableChanged((prev) => !prev);
  };

  // Re-Fetch user after updating
  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(API_URL + "/users/" + id);
      if (response.status === 200) {
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
      requestCode,
      validateCode,
      resetPassword,
      updateEmployee,
      updateEmployees,
      deleteEmployee,
      allEmployees,
      employeeTableChanged,
      employeesLoading,
      logout,
    }),
    [currentEmployee, employeesLoading, allEmployees, employeeTableChanged]
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
