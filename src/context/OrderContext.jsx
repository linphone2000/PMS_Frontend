// React
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMaster } from "./MasterContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Context
  const { tableChanged, setTableChanged } = useMaster();

  // API
  const API_URL = import.meta.env.VITE_API_URL;

  // States
  const [allOrders, setAllOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderTableChanged, setOrderTableChanged] = useState(false);

  // Fetch all orders
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/`);
        if (response.status === 200) {
          setAllOrders(response.data);
        } else {
          setAllOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    getAllOrders();
  }, [tableChanged, orderTableChanged]);

  // Add order
  const addOrder = async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders/add`, orderData);
      setOrderTableChanged((prev) => !prev);
      setTableChanged((prev) => !prev);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error adding order");
      }
    }
  };

  // Update order
  const updateOrder = async (orderData) => {
    try {
      const response = await axios.put(
        `${API_URL}/orders/${orderData._id}`,
        orderData
      );
      if (response.status === 200) {
        setOrderTableChanged((prev) => !prev);
        setTableChanged((prev) => !prev);
        return response;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error updating order");
      }
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/orders/${id}`);
      if (response.status === 200) {
        setOrderTableChanged((prev) => !prev);
        setTableChanged((prev) => !prev);
        return response;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error deleting order");
      }
    }
  };

  const orderContextValue = useMemo(
    () => ({
      allOrders,
      ordersLoading,
      addOrder,
      updateOrder,
      deleteOrder,
    }),
    [allOrders, ordersLoading]
  );

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
