import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [allCustomers, setAllCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [customerTableChanged, setCustomerTableChanged] = useState(false);

  // Fetch all customers
  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const response = await axios.get(API_URL + "/customers/");
        if (response.status === 200) {
          setAllCustomers(response.data);
        } else {
          setAllCustomers([]);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setAllCustomers([]);
      } finally {
        setCustomersLoading(false);
      }
    };
    getAllCustomers();
  }, [customerTableChanged]);

  // Handlers
  // Add Customer
  const addCustomer = async (customerData) => {
    try {
      const response = await axios.post(API_URL + "/customers", customerData);
      setCustomerTableChanged((prev) => !prev);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error adding customer");
      }
    }
  };

  // Update Customer
  const updateCustomer = async (customerData) => {
    try {
      const response = await axios.put(
        API_URL + "/customers/" + customerData._id,
        customerData
      );
      if (response.status === 200) {
        setCustomerTableChanged((prev) => !prev);
        return response;
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  };

  // Delete Customer
  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/customers/" + id);
      if (response.status === 200) {
        setAllCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== id)
        );
        return response;
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  };

  // Fetch Customer by ID
  const fetchCustomerById = async (id) => {
    try {
      const response = await axios.get(API_URL + "/customers/" + id);
      return response;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  };

  // Memo
  const customerContextValue = useMemo(
    () => ({
      allCustomers,
      customersLoading,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      fetchCustomerById,
    }),
    [allCustomers, customersLoading]
  );

  return (
    <CustomerContext.Provider value={customerContextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(CustomerContext);
};
