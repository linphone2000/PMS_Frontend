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

  // Search
  const filteredSuppliers = allSuppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleSupplierAdd = () => {
    handleSetModalForm("supplieradd");
    handleOpenModal();
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
          placeholder="Search suppliers..."
          className="p-2 rounded-lg border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="p-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition"
          onClick={() => handleSupplierAdd()}
        >
          Add Supplier
        </button>
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
              <SupplierRow key={supplier._id} supplier={supplier} />
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Supplier;
