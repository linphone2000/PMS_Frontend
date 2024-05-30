import { useRef, useState } from "react";
// Context
import { useOrder } from "../../../context/OrderContext";
import { useUIModal } from "../../../context/UIModalContext";
import { useCustomer } from "../../../context/CustomerContext";
import { useInventory } from "../../../context/InventoryContext";

const OrderAddForm = () => {
  // Context
  const { addOrder } = useOrder();
  const { handleCloseModal, showToast } = useUIModal();
  const { allCustomers } = useCustomer();
  const { allItems } = useInventory();

  // Refs
  const customerIDRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const deliveryAddressRef = useRef(null);
  const remarksRef = useRef(null);
  const statusRef = useRef(null);

  // State
  const [items, setItems] = useState([
    { itemID: "", itemName: "", quantity: 1, price: 0 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handlers
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);

    // Update item name and price based on selected item ID
    if (field === "itemID") {
      const selectedItem = allItems.find((item) => item._id === value);
      if (selectedItem) {
        newItems[index].itemName = selectedItem.itemName;
        newItems[index].price = selectedItem.price;
      }
    }

    setTotalPrice(
      newItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  };

  const handleAddItem = () => {
    setItems([...items, { itemID: "", itemName: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setTotalPrice(
      newItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check item quantities
    for (const item of items) {
      const inventoryItem = allItems.find(
        (invItem) => invItem._id === item.itemID
      );
      if (inventoryItem && item.quantity > inventoryItem.quantity) {
        showToast(
          "error",
          `Quantity for ${item.itemName} exceeds available stock`
        );
        return;
      }
    }

    const orderData = {
      customerID: customerIDRef.current.value,
      items,
      totalPrice,
      paymentMethod: paymentMethodRef.current.value,
      deliveryAddress: deliveryAddressRef.current.value,
      remarks: remarksRef.current.value,
      // status: statusRef.current.value,
    };

    try {
      const response = await addOrder(orderData);
      handleCloseModal();
      showToast("success", "Order added successfully!");
    } catch (error) {
      console.error("Error adding order:", error);
      showToast("error", error.message);
    }
  };

  return (
    <div>
      <div className="text-center bg-sky-700 py-6">
        <h1 className="text-3xl font-bold text-white">Add a New Order</h1>
      </div>
      <form
        className="px-8 py-6 bg-gray-900 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Customer:</label>
            <select
              ref={customerIDRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            >
              <option value="">Select Customer</option>
              {allCustomers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Payment Method:</label>
            <input
              type="text"
              ref={paymentMethodRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">
              Delivery Address:
            </label>
            <input
              type="text"
              ref={deliveryAddressRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Remarks:</label>
            <input
              type="text"
              ref={remarksRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block mb-1 text-gray-200">Status:</label>
            <select
              ref={statusRef}
              className="border border-gray-300 bg-white px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
              disabled={true}
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div> */}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200">Items:</label>
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2"
            >
              <select
                value={item.itemID}
                onChange={(e) =>
                  handleItemChange(index, "itemID", e.target.value)
                }
                className="border border-gray-300 px-2 py-1 rounded-md w-full"
                required
              >
                <option value="">Select Item</option>
                {allItems.map((invItem) => (
                  <option key={invItem._id} value={invItem._id}>
                    {invItem.itemName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="border border-gray-300 px-2 py-1 rounded-md w-full"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                className="border border-gray-300 px-2 py-1 rounded-md w-full"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add Item
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition mr-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition"
          >
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderAddForm;
