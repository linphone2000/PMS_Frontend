import { useState } from "react";
// Context
import { useOrder } from "../../../context/OrderContext";
import { useUIModal } from "../../../context/UIModalContext";
import { useInventory } from "../../../context/InventoryContext";

const OrderRow = ({ order, isEditable, onEdit, onCancelEdit }) => {
  // Context
  const { updateOrder, deleteOrder } = useOrder();
  const { showToast } = useUIModal();
  const { allItems } = useInventory();

  // States
  const [items, setItems] = useState(order.items);
  const [totalPrice, setTotalPrice] = useState(order.totalPrice);
  const [paymentMethod, setPaymentMethod] = useState(order.paymentMethod);
  const [deliveryAddress, setDeliveryAddress] = useState(order.deliveryAddress);
  const [remarks, setRemarks] = useState(order.remarks);
  const [status, setStatus] = useState(order.status);

  // Handlers
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === "itemID") {
      const selectedItem = allItems.find((item) => item._id === value);
      if (selectedItem) {
        newItems[index].itemName = selectedItem.itemName;
        newItems[index].price = selectedItem.price;
      }
    }

    setItems(newItems);
    setTotalPrice(
      newItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  };

  const handleUpdate = async () => {
    const updatedOrder = {
      _id: order._id,
      items,
      totalPrice,
      paymentMethod,
      deliveryAddress,
      remarks,
      status,
    };

    try {
      await updateOrder(updatedOrder);
      showToast("success", "Order updated successfully.");
      onCancelEdit();
    } catch (error) {
      console.error("Error updating order:", error);
      showToast("error", error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this order?`)) {
      try {
        await deleteOrder(order._id);
        showToast("success", "Order deleted successfully.");
      } catch (error) {
        console.error("Error deleting order:", error);
        showToast("error", error.message);
      }
    }
  };

  return (
    <>
      <tr className="hover:bg-sky-800 transition-colors duration-300">
        <td className="p-4">{order.customerID.name}</td>
        <td className="p-4">
          {items.map((item, index) => (
            <div key={index} className="mb-2">
              {isEditable ? (
                <select
                  value={item.itemID}
                  onChange={(e) =>
                    handleItemChange(index, "itemID", e.target.value)
                  }
                  className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
                  required
                >
                  <option value="">Select Item</option>
                  {allItems.map((invItem) => (
                    <option key={invItem._id} value={invItem._id}>
                      {invItem.itemName}
                    </option>
                  ))}
                </select>
              ) : (
                item.itemName
              )}
            </div>
          ))}
        </td>
        <td className="p-4">
          {items.map((item, index) => (
            <div key={index} className="mb-2">
              {isEditable ? (
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
                  required
                />
              ) : (
                item.quantity
              )}
            </div>
          ))}
        </td>
        <td className="p-4">
          {items.map((item, index) => (
            <div key={index} className="mb-2">
              {isEditable ? (
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
                  required
                />
              ) : (
                item.price
              )}
            </div>
          ))}
        </td>
        <td className="p-4">{totalPrice.toFixed(2)}</td>

        <td className="p-4">
          {new Date(order.orderDate).toLocaleDateString()}
        </td>
        <td className="p-4">
          {isEditable ? (
            <input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
            />
          ) : (
            paymentMethod
          )}
        </td>
        <td className="p-4">
          {isEditable ? (
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
            />
          ) : (
            deliveryAddress
          )}
        </td>
        <td className="p-4">
          {isEditable ? (
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
            />
          ) : (
            remarks
          )}
        </td>
        <td className="p-4">
          {isEditable ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          ) : (
            <p
              className={`px-2 py-1 rounded-lg text-center border ${
                status === "Pending"
                  ? "border-yellow-500 text-yellow-500 w-24"
                  : "border-green-500 text-green-500 w-24"
              }`}
            >
              {status}
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
    </>
  );
};

export default OrderRow;
