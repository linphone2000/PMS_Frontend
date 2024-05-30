// Components
import CustomerRow from "./CustomerRow.jsx";
// Context
import { useCustomer } from "../../../context/CustomerContext.jsx";
// React
import { useState } from "react";
import { motion } from "framer-motion";
import { useUIModal } from "../../../context/UIModalContext.jsx";

const Customer = () => {
  // Context
  const { allCustomers, customersLoading } = useCustomer();
  const { handleSetModalForm, handleOpenModal } = useUIModal();

  // Test

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);

  // Search
  const filteredCustomers = allCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleCustomerAdd = () => {
    handleSetModalForm("customeradd");
    handleOpenModal();
  };

  const handleEdit = (customerId) => {
    setEditableRow(customerId);
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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="p-2 rounded-lg border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="p-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition"
          onClick={() => handleCustomerAdd()}
        >
          Add Customer
        </button>
      </div>
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
        <thead className="bg-sky-700 text-gray-200">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Contact Number</th>
            <th className="p-4">Email</th>
            <th className="p-4">Address</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-400 text-sm">
          {customersLoading ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No customers found.
              </td>
            </tr>
          ) : (
            filteredCustomers.map((customer) => (
              <CustomerRow
                key={customer._id}
                customer={customer}
                isEditable={editableRow === customer._id}
                onEdit={() => handleEdit(customer._id)}
                onCancelEdit={handleCancelEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Customer;
