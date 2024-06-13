// shadcn ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// React
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
  const deliveryAddressRef = useRef(null);
  const remarksRef = useRef(null);

  // State
  const [items, setItems] = useState([
    { itemID: "", itemName: "", quantity: 1, price: 0 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCustomerID, setSelectedCustomerID] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

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

  const handleCustomerChange = (value) => {
    setSelectedCustomerID(value);
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
    // Clear card details when changing payment method
    setCardNumber("");
    setCvv("");
    setExpirationDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate card details if payment method is Banking
    if (selectedPaymentMethod === "Banking") {
      // Code source: Internet
      const cardNumberRegex = /^\d{16}$/;
      const cvvRegex = /^\d{3,4}$/;
      const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

      if (!cardNumberRegex.test(cardNumber)) {
        showToast("error", "Invalid card number. Must be 16 digits.");
        return;
      }
      if (!cvvRegex.test(cvv)) {
        showToast("error", "Invalid CVV. Must be 3 or 4 digits.");
        return;
      }
      if (!expirationDateRegex.test(expirationDate)) {
        showToast("error", "Invalid expiration date. Must be MM/YY format.");
        return;
      }
    }

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
      customerID: selectedCustomerID,
      items,
      totalPrice,
      paymentMethod: selectedPaymentMethod,
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

  // Card image shower
  const getCardImage = (cardNumber) => {
    const firstDigit = cardNumber[0];
    if (firstDigit === "4") return "visa.png";
    if (firstDigit === "5") return "master.png";
    if (firstDigit === "3") return "jcb.png";
    return "defaultcard.png";
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
            <Select
              value={selectedCustomerID}
              onValueChange={handleCustomerChange}
              className="z-50"
            >
              <SelectTrigger className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-sky-500 z-50">
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {allCustomers.map((customer) => (
                  <SelectItem
                    className="z-50"
                    key={customer._id}
                    value={customer._id}
                  >
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Payment Method:</label>
            <Select
              value={selectedPaymentMethod}
              onValueChange={handlePaymentMethodChange}
              className="z-50"
            >
              <SelectTrigger className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-sky-500 z-50">
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem className="z-50" value="Cash">
                  Cash
                </SelectItem>
                <SelectItem className="z-50" value="Banking">
                  Banking
                </SelectItem>
                {/* Add more payment methods as needed */}
              </SelectContent>
            </Select>
          </div>

          {/* Card */}
          {selectedPaymentMethod === "Banking" && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 col-span-2">
              <div>
                <label className="block mb-1 text-gray-200">Card Number:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500 pl-12"
                    maxLength="16"
                    required
                  />
                  <img
                    src={getCardImage(cardNumber)}
                    className="w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-2"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-200">CVV:</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
                  placeholder="Eg: 123 or 1234"
                  maxLength="4"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-200">Expiration:</label>
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
            </div>
          )}

          {/* Address */}
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
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-200">Items:</label>
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
            >
              <Select
                value={item.itemID}
                onValueChange={(value) =>
                  handleItemChange(index, "itemID", value)
                }
                className="z-50"
              >
                <SelectTrigger className="w-full border border-gray-300 px-2 py-1 rounded-md z-50">
                  <SelectValue placeholder="Select Item" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {allItems
                    .filter((invItem) => invItem.status !== "Pending")
                    .map((invItem) => (
                      <SelectItem
                        className="z-50"
                        key={invItem._id}
                        value={invItem._id}
                      >
                        {invItem.itemName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

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
              <p className="flex items-center ps-4 bg-white rounded-md border border-gray-300">
                ${item.price * item.quantity}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="p-2 outline outline-rose-500 text-rose-500 hover:text-white rounded-lg hover:bg-rose-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="p-2 outline outline-emerald-500 text-emerald-500 hover:text-white rounded-lg hover:bg-emerald-600 transition"
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
