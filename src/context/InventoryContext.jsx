import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSupplier } from "./SupplierContext";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  // Context
  const { supplierTableChanged } = useSupplier();

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [allItems, setAllItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemTableChanged, setItemTableChanged] = useState(false);

  // Fetch all items
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await axios.get(API_URL + "/inventory/");
        if (response.status === 200) {
          setAllItems(response.data);
        } else {
          setAllItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setAllItems([]);
      } finally {
        setItemsLoading(false);
      }
    };
    getAllItems();
  }, [itemTableChanged, supplierTableChanged]);

  // Handlers
  // Add Item
  const addItem = async (itemData) => {
    const formData = new FormData();
    formData.append("itemName", itemData.get("itemName"));
    formData.append("quantity", itemData.get("quantity"));
    formData.append("price", itemData.get("price"));
    formData.append("supplierId", itemData.get("supplierId"));
    formData.append("expiryDate", itemData.get("expiryDate"));
    formData.append("status", itemData.get("status"));
    formData.append("category", itemData.get("category"));
    if (itemData.get("image")) {
      formData.append("image", itemData.get("image"));
    }

    try {
      const response = await axios.post(API_URL + "/inventory/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setItemTableChanged((prev) => !prev);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error adding item");
      }
    }
  };

  // Update Item
  const updateItem = async (itemData) => {
    const formData = new FormData();
    formData.append("itemName", itemData.get("itemName"));
    formData.append("quantity", itemData.get("quantity"));
    formData.append("price", itemData.get("price"));
    formData.append("supplierId", itemData.get("supplierId"));
    formData.append("expiryDate", itemData.get("expiryDate"));
    formData.append("status", itemData.get("status"));
    formData.append("category", itemData.get("category"));
    if (itemData.get("image")) {
      formData.append("image", itemData.get("image"));
    }

    try {
      const response = await axios.put(
        API_URL + "/inventory/" + itemData.get("_id"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setItemTableChanged((prev) => !prev);
        return response;
      }
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  };

  // Delete Item
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/inventory/" + id);
      if (response.status === 200) {
        setAllItems((prevItems) => prevItems.filter((item) => item._id !== id));
        return response;
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };

  // Fetch Item by ID
  const fetchItemById = async (id) => {
    try {
      const response = await axios.get(API_URL + "/inventory/" + id);
      return response;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };

  // Memo
  const inventoryContextValue = useMemo(
    () => ({
      allItems,
      itemsLoading,
      addItem,
      updateItem,
      deleteItem,
      fetchItemById,
    }),
    [allItems, itemsLoading]
  );

  return (
    <InventoryContext.Provider value={inventoryContextValue}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
