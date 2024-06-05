// React
import { useRef, useState } from "react";
// Context
import { useInventory } from "../../../context/InventoryContext";
import { useSupplier } from "../../../context/SupplierContext";
import { useUIModal } from "../../../context/UIModalContext";

const InventoryAddForm = () => {
  // Context
  const { addItem } = useInventory();
  const { allSuppliers } = useSupplier();
  const { handleCloseModal, showToast } = useUIModal();

  // Refs
  const itemNameRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const supplierRef = useRef(null);
  const imageRef = useRef(null);
  const expiryDateRef = useRef(null);
  const statusRef = useRef(null);
  const categoryRef = useRef(null);

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

  // State
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = new FormData();
    itemData.append("itemName", itemNameRef.current.value);
    itemData.append("quantity", quantityRef.current.value);
    itemData.append("price", priceRef.current.value);
    itemData.append("supplierId", supplierRef.current.value);
    itemData.append("expiryDate", expiryDateRef.current.value);
    itemData.append("status", statusRef.current.value);
    itemData.append("category", categoryRef.current.value);
    if (imageRef.current.files[0]) {
      itemData.append("image", imageRef.current.files[0]);
    }

    // Log FormData
    for (let [key, value] of itemData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await addItem(itemData);
      handleCloseModal();
      showToast("success", "Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      showToast("error", error.message);
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const handleFileChange = async (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <>
      <div className="text-center bg-sky-700 py-6">
        <h1 className="text-3xl font-bold text-white">
          Add a New Inventory Item
        </h1>
      </div>
      <form
        className="px-8 py-6 bg-gray-900 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Item Name:</label>
            <input
              type="text"
              ref={itemNameRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Quantity:</label>
            <input
              type="number"
              ref={quantityRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Price:</label>
            <input
              type="number"
              ref={priceRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Supplier:</label>
            <select
              ref={supplierRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            >
              <option value="">Select Supplier</option>
              {allSuppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 md:col-span-1">
            <label className="block mb-1 text-gray-200">Category:</label>
            <select
              ref={categoryRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 md:col-span-1">
            <label className="block mb-1 text-gray-200">Expiry Date:</label>
            <input
              type="date"
              ref={expiryDateRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          {/* Image Upload Input */}
          <div className="mb-4 col-span-2">
            <label className="block mb-1 text-gray-200">Image:</label>
            {/* Image */}
            <div className="flex gap-4 items-center">
              <button
                onClick={handleFileUpload}
                className="bg-sky-500 hover:bg-sky-600 max-h-12 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none focus:bg-sky-600"
              >
                Choose File
              </button>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Item Preview"
                  className="mt-2 w-16 h-16 object-cover rounded-md"
                />
              )}
              <input
                type="file"
                ref={imageRef}
                onChange={handleFileChange}
                className="opacity-0 w-0"
              />
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label className="block mb-1 text-gray-200">Status:</label>
            <select
              ref={statusRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Arrived">Arrived</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition mr-2 focus:outline-none"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition focus:outline-none"
          >
            Add Item
          </button>
        </div>
      </form>
    </>
  );
};

export default InventoryAddForm;
