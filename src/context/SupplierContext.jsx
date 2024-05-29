import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [suppliersLoading, setSuppliersLoading] = useState(true);
  const [supplierTableChanged, setSupplierTableChanged] = useState(false);

  // Fetch all suppliers
  useEffect(() => {
    const getAllSuppliers = async () => {
      try {
        const response = await axios.get(API_URL + "/suppliers/");
        if (response.status === 200) {
          setAllSuppliers(response.data.suppliers);
        } else {
          setAllSuppliers([]);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setAllSuppliers([]);
      } finally {
        setSuppliersLoading(false);
      }
    };
    getAllSuppliers();
  }, [supplierTableChanged]);

  // Handlers
  // Register Supplier
  const registerSupplier = async (supplierData) => {
    try {
      const response = await axios.post(
        API_URL + "/suppliers/register",
        supplierData
      );
      setSupplierTableChanged((prev) => !prev);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error registering supplier");
      }
    }
  };

  // Update Supplier
  const updateSupplier = async (supplierData) => {
    try {
      const response = await axios.put(
        API_URL + "/suppliers/" + supplierData._id,
        supplierData
      );
      if (response.status === 200) {
        fetchSupplierById(supplierData._id); // Re-fetch the supplier after updating
        return response;
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
  };

  // Delete Supplier
  const deleteSupplier = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/suppliers/" + id);
      if (response.status === 200) {
        setSupplierTableChanged((prev) => !prev);
        return response;
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw error;
    }
  };

  // Fetch Supplier by ID
  const fetchSupplierById = async (id) => {
    try {
      const response = await axios.get(API_URL + "/suppliers/" + id);
      return response;
    } catch (error) {
      console.error("Error fetching supplier:", error);
      throw error;
    }
  };

  // Memo
  const supplierContextValue = useMemo(
    () => ({
      allSuppliers,
      suppliersLoading,
      registerSupplier,
      updateSupplier,
      supplierTableChanged,
      deleteSupplier,
      fetchSupplierById,
    }),
    [allSuppliers, suppliersLoading, supplierTableChanged]
  );

  return (
    <SupplierContext.Provider value={supplierContextValue}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => {
  return useContext(SupplierContext);
};
