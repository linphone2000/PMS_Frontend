// shadcn ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// State
import { useState } from "react";
// Context
import { useOrder } from "../../../context/OrderContext";
import { useUIModal } from "../../../context/UIModalContext";

const OrderRow = ({ order, isEditable, onEdit, onCancelEdit }) => {
  // Context
  const { updateOrder, deleteOrder, setInvoice } = useOrder();
  const { showToast, handleSetModalForm, handleOpenModal } = useUIModal();

  // States
  const [remarks, setRemarks] = useState(order.remarks);
  const [status, setStatus] = useState(order.status);

  // Handlers
  const handleUpdate = async () => {
    const updatedOrder = {
      _id: order._id,
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

  const handlePrintInvoice = () => {
    setInvoice(order);
    handleSetModalForm("printinvoice");
    handleOpenModal();
  };

  return (
    <>
      <tr className="hover:bg-sky-800 transition-colors duration-300">
        <td className="p-4">{order.customerID.name}</td>
        <td className="p-4">
          {order.items.map((item) => item.itemName).join(", ")}
        </td>
        <td className="p-4">
          {order.items.map((item) => item.quantity).join(", ")}
        </td>
        <td className="p-4">
          {order.items.map((item) => `$${item.price.toFixed(2)}`).join(", ")}
        </td>
        <td className="p-4">{order.totalPrice.toFixed(2)}</td>
        <td className="p-4">
          {new Date(order.orderDate).toLocaleDateString()}
        </td>
        <td className="p-4">{order.paymentMethod}</td>
        <td className="p-4">{order.deliveryAddress}</td>
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
                  ? "border-amber-500 text-amber-500 w-24"
                  : status === "Delivered"
                  ? "border-emerald-500 text-emerald-500 w-24"
                  : "border-rose-500 text-rose-500 w-24"
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
              {/* Editing status */}
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={() => {
                      if (
                        order.status !== "Cancelled" &&
                        order.status !== "Delivered"
                      ) {
                        onEdit();
                      }
                    }}
                    className={`rounded-md transition ${
                      order.status == "Cancelled" || order.status == "Delivered"
                        ? "text-gray-600 border border-gray-600 hover:cursor-not-allowed"
                        : "text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-sky-500 hover:text-sky-500"
                    }`}
                  >
                    <i className="fa-solid fa-pen-to-square text-lg p-1.5"></i>
                  </div>
                </TooltipTrigger>
                {order.status == "Cancelled" ||
                order.status == "Delivered" ? null : (
                  <TooltipContent>
                    <p>Edit Status</p>
                  </TooltipContent>
                )}
              </Tooltip>

              {/* Printing Invoice */}
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={handlePrintInvoice}
                    disabled={order.status == "Cancelled"}
                    className={`rounded-md transition ${
                      order.status == "Cancelled"
                        ? "text-gray-600 border border-gray-600"
                        : "text-gray-400 border border-gray-400"
                    }
                    ${
                      order.status == "Cancelled"
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer hover:border-sky-500 hover:text-sky-500"
                    }`}
                  >
                    <i className="fa-solid fa-file-invoice text-lg p-1.5 "></i>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Print Invoice</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default OrderRow;
