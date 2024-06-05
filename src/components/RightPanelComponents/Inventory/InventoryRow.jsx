// States
import { useState } from "react";
// Context
import { useInventory } from "../../../context/InventoryContext";
import { useSupplier } from "../../../context/SupplierContext";
import { useUIModal } from "../../../context/UIModalContext";
import { AnimatePresence, motion } from "framer-motion";

const InventoryRow = ({ item, isEditable, onEdit, onCancelEdit }) => {
  // Context
  const { updateItem, deleteItem } = useInventory();
  const { allSuppliers } = useSupplier();
  const { showToast } = useUIModal();

  // States
  const [itemName, setItemName] = useState(item.itemName);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate);
  const [status, setStatus] = useState(item.status);
  const [supplierId, setSupplierId] = useState(
    item.supplier ? item.supplier._id : ""
  );
  const [category, setCategory] = useState(item.category);
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Categories
  const categories = [
    "Medicine",
    "Supplement",
    "Equipment",
    "Cosmetic",
    "Personal Care",
    "Household",
    "Other",
  ];

  // Handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFileChange = async (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpdate = async () => {
    const itemData = new FormData();
    itemData.append("itemName", itemName);
    itemData.append("quantity", quantity);
    itemData.append("price", price);
    itemData.append("supplierId", supplierId);
    itemData.append("expiryDate", expiryDate);
    itemData.append("status", status);
    itemData.append("category", category);
    itemData.append("_id", item._id);
    if (image) {
      itemData.append("image", image);
    }

    try {
      await updateItem(itemData);
      showToast("success", "Item updated.");
      onCancelEdit();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${item.itemName}`))
    try {
      await deleteItem(item._id);
      showToast("success", "Item deleted.");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <tr className="hover:bg-sky-800 transition-colors duration-300">
      <td className="flex p-4">
        {/* Image */}
        <div
          className="relative w-16 h-16 rounded-md overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.image && image == null ? (
            <img
              src={`${IMG_URL}/${item.image}`}
              alt="Item Image"
              className="w-full h-full object-cover"
            />
          ) : image ? (
            <img
              className="w-full h-full object-cover"
              src={URL.createObjectURL(image)}
              alt="New Item Image"
            />
          ) : (
            <img
              src="default_image.jpeg"
              alt="Default Image"
              className="w-16 h-16 object-cover rounded-md"
            />
          )}

          {isEditable && isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md"
            >
              <p className="text-white">Upload</p>
            </motion.div>
          )}

          {isEditable && (
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          )}
        </div>
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {itemName}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {quantity}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {price}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          >
            <option value="">Select Supplier</option>
            {allSuppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.supplierName}
              </option>
            ))}
          </select>
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {item.supplier ? item.supplier.supplierName : <span className="text-rose-500">Supplier Deleted</span>}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {category}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md text-white">
            {new Date(item.expiryDate).toLocaleDateString()}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-24 bg-transparent text-white"
          >
            <option value="Pending">Pending</option>
            <option value="Arrived">Arrived</option>
          </select>
        ) : (
          <p
            className={`px-2 py-1 rounded-lg text-center border ${
              item.status === "Pending"
                ? "border-yellow-500 text-yellow-500 w-24"
                : "border-green-500 text-green-500 w-24"
            }`}
          >
            {item.status}
          </p>
        )}
      </td>

      <td className="p-4 text-center">
        {isEditable ? (
          <div className="flex gap-2 justify-center">
            <i
              onClick={handleUpdate}
              className="fa-solid fa-check text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-sky-500 hover:text-sky-500 transition"
            ></i>
            <i
              onClick={onCancelEdit}
              className="fa-solid fa-times text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-red-500 hover:text-red-500 transition"
            ></i>
          </div>
        ) : (
          <div className="flex justify-center gap-2">
            <i
              onClick={onEdit}
              className="fa-solid fa-pen-to-square text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-sky-500 hover:text-sky-500 transition"
            ></i>
            <i
              onClick={handleDelete}
              className="fa-solid fa-trash text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-red-500 hover:text-red-500 transition"
            ></i>
          </div>
        )}
      </td>
    </tr>
  );
};

export default InventoryRow;
