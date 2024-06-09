// shadcn ui
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// React
import { useState } from "react";
// Context
import { useAuth } from "../../../context/AuthContext";
import { formatRoleName } from "../../../utils/formatter";
import { useUIModal } from "../../../context/UIModalContext";
import { AnimatePresence, motion } from "framer-motion";

const EmployeeRow = ({ employee, isEditable, onEdit, onCancelEdit }) => {
  // Context
  const { updateEmployees, deleteEmployee, currentEmployee } = useAuth();
  const { showToast } = useUIModal();

  // States
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [role, setRole] = useState(employee.role);
  const [employeeID, setEmployeeID] = useState(employee.employeeID);
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("role", role);
    userData.append("employeeID", employeeID);
    userData.append("_id", employee._id);
    if (image) {
      userData.append("image", image);
    }

    try {
      await updateEmployees(userData);
      showToast("success", "Employee updated.");
      onCancelEdit();
    } catch (error) {
      console.error("Error updating employee:", error);
      showToast("error", error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      try {
        await deleteEmployee(employee._id);
        showToast("success", "Employee deleted.");
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // API
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <tr className="hover:bg-sky-800 transition-colors duration-300">
      <td className="flex p-4 relative">
        <div
          className="relative w-16 h-16 overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {employee.image && image == null ? (
            <img
              src={`${IMG_URL}/${employee.image}`}
              alt="Profile Picture"
              className="w-full h-full rounded-md object-cover border border-gray-400"
            />
          ) : image ? (
            <img
              className="w-full h-full rounded-md object-cover border border-gray-400"
              src={URL.createObjectURL(image)}
              alt="New Profile Picture"
            />
          ) : (
            <img
              src="default_profile.jpeg"
              alt="Default Profile"
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
        <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
          {formatRoleName(role)}
        </p>
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {employeeID}
          </p>
        )}
      </td>
      <td className="p-4">{new Date(employee.createdAt).toLocaleString()}</td>
      <td className="p-4">{new Date(employee.updatedAt).toLocaleString()}</td>
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

export default EmployeeRow;
