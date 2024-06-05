// Components
import InventoryRow from "./InventoryRow.jsx";
// Context
import { useInventory } from "../../../context/InventoryContext";
// React
import { useState } from "react";
import { motion } from "framer-motion";
import { useUIModal } from "../../../context/UIModalContext.jsx";

const Inventory = () => {
  // Context
  const { allItems, itemsLoading } = useInventory();
  const { handleSetModalForm, handleOpenModal } = useUIModal();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);

  // Search
  const filteredItems = allItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleItemAdd = () => {
    handleSetModalForm("inventoryadd");
    handleOpenModal();
  };

  const handleEdit = (itemId) => {
    setEditableRow(itemId);
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
        {/* Heading */}
        <h1 className="text-sky-50 text-2xl font-bold">Inventory/Stock Overview</h1>

        <div className="flex gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search items..."
            className="py-2 px-4 rounded-full border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Add */}
          <button
            className="py-2 px-4 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
            onClick={() => handleItemAdd()}
          >
            Add Item
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
          <thead className="bg-sky-700 text-gray-200">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
              <th className="p-4">Supplier</th>
              <th className="p-4">Category</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 text-gray-400 text-sm">
            {itemsLoading ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <InventoryRow
                  key={item._id}
                  item={item}
                  isEditable={editableRow === item._id}
                  onEdit={() => handleEdit(item._id)}
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

export default Inventory;
