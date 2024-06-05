// Components
import SupplierRow from "./SupplierRow.jsx";
// Context
import { useSupplier } from "../../../context/SupplierContext";
// React
import { useState } from "react";
import { motion } from "framer-motion";
import { useUIModal } from "../../../context/UIModalContext.jsx";

const Supplier = () => {
  // Context
  const { allSuppliers, suppliersLoading } = useSupplier();
  const { handleSetModalForm, handleOpenModal } = useUIModal();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);

  // Search
  const filteredSuppliers = allSuppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleSupplierAdd = () => {
    handleSetModalForm("supplieradd");
    handleOpenModal();
  };

  const handleEdit = (supplierId) => {
    setEditableRow(supplierId);
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
        <h1 className="text-sky-50 text-2xl font-bold">Supplier Overview</h1>

        <div className="flex gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search suppliers..."
            className="py-2 px-4 rounded-full border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Add */}
          <button
            className="py-2 px-4 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
            onClick={() => handleSupplierAdd()}
          >
            Add Supplier
          </button>
        </div>
      </div>
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
        <thead className="bg-sky-700 text-gray-200">
          <tr>
            <th className="p-4">Supplier Name</th>
            <th className="p-4">Contact Person</th>
            <th className="p-4">Contact Number</th>
            <th className="p-4">Email</th>
            <th className="p-4">Address</th>
            <th className="p-4">Contract Start Date</th>
            <th className="p-4">Contract End Date</th>
            <th className="p-4">Payment Terms</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-400 text-sm">
          {suppliersLoading ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : filteredSuppliers.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                No suppliers found.
              </td>
            </tr>
          ) : (
            filteredSuppliers.map((supplier) => (
              <SupplierRow
                key={supplier._id}
                supplier={supplier}
                isEditable={editableRow === supplier._id}
                onEdit={() => handleEdit(supplier._id)}
                onCancelEdit={handleCancelEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Supplier;
