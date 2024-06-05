import { useState } from "react";
import { motion } from "framer-motion";
// Component
import OrderRow from "./OrderRow";
// Context
import { useOrder } from "../../../context/OrderContext";
import { useUIModal } from "../../../context/UIModalContext";

const Orders = () => {
  // Context
  const { allOrders, ordersLoading } = useOrder();
  const { handleSetModalForm, handleOpenModal } = useUIModal();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);

  const filteredOrders = allOrders.filter((order) =>
    order.customerID.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderAdd = () => {
    handleSetModalForm("orderadd");
    handleOpenModal();
  };

  const handleEdit = (orderId) => {
    setEditableRow(orderId);
  };

  const handleCancelEdit = () => {
    setEditableRow(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-900 min-h-screen"
    >
      <div className="flex justify-between items-center mb-6">
        {/* Heading */}
        <h1 className="text-sky-50 text-2xl font-bold">Order Overview</h1>

        <div className="flex gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search orders..."
            className="py-2 px-4 rounded-full border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Add */}
          <button
            className="py-2 px-4 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
            onClick={handleOrderAdd}
          >
            Add Order
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
          <thead className="bg-sky-700 text-gray-200">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Items</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Delivery Address</th>
              <th className="p-4">Remarks</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 text-gray-400 text-sm">
            {ordersLoading ? (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  isEditable={editableRow === order._id}
                  onEdit={() => handleEdit(order._id)}
                  onCancelEdit={handleCancelEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Orders;
