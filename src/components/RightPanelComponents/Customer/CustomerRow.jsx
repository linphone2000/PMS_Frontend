// shadcn ui
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// React
import { useState } from "react";
// Context
import { useCustomer } from "../../../context/CustomerContext";
import { useUIModal } from "../../../context/UIModalContext";

const CustomerRow = ({ customer, isEditable, onEdit, onCancelEdit }) => {
  // Context
  const { updateCustomer, deleteCustomer } = useCustomer();
  const { showToast } = useUIModal();

  // States
  const [name, setName] = useState(customer.name);
  const [contactNumber, setContactNumber] = useState(customer.contactNumber);
  const [email, setEmail] = useState(customer.email);
  const [address, setAddress] = useState(customer.address);

  // Handlers
  const handleUpdate = async () => {
    const customerData = {
      _id: customer._id,
      name,
      contactNumber,
      email,
      address,
    };

    try {
      await updateCustomer(customerData);
      showToast("success", "Customer updated.");
      onCancelEdit();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        await deleteCustomer(customer._id);
        showToast("success", "Customer deleted.");
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <tr className="hover:bg-sky-800 transition-colors duration-300">
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {name}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {contactNumber}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {email}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {address}
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
            {/* Edit */}
            <Tooltip>
              <TooltipTrigger>
                <i
                  onClick={onEdit}
                  className="fa-solid fa-pen-to-square text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-sky-500 hover:text-sky-500 transition"
                ></i>
              </TooltipTrigger>
              <TooltipContent className="bg-sky-600 border border-sky-600">
                <p className="text-sky-50">Edit</p>
              </TooltipContent>
            </Tooltip>
            {/* Delete */}
            <Tooltip>
              <TooltipTrigger>
                <i
                  onClick={handleDelete}
                  className="fa-solid fa-trash text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-red-500 hover:text-red-500 transition"
                ></i>
              </TooltipTrigger>
              <TooltipContent className="bg-rose-500 border border-rose-500">
                <p className="text-sky-50">Delete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CustomerRow;
