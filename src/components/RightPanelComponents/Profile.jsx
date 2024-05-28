// React
import { useState } from "react";
import { FaUserAlt, FaEnvelope, FaIdBadge, FaUserTag } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
// Context
import { useAuth } from "../../context/AuthContext";
// Utils
import { formatRoleName } from "../../utils/formatter";
import { useUIModal } from "../../context/UIModalContext";

const Profile = () => {
  // API URL
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  // Context
  const { currentEmployee, updateEmployee } = useAuth();
  const { showToast } = useUIModal();

  // States
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(currentEmployee.name);
  const [email, setEmail] = useState(currentEmployee.email);
  const [editMode, setEditMode] = useState(false);

  // Handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFileChange = async (event) => {
    setImage(event.target.files[0]);
    const response = await updateEmployee({
      image: event.target.files[0],
      id: currentEmployee._id,
    });
    showToast("success", response.data.message);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdate = async () => {
    const response = await updateEmployee({
      name: name,
      email: email,
      id: currentEmployee._id,
    });
    showToast("success", response.data.message);
    setEditMode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center h-full bg-gray-900"
    >
      <div className="bg-gray-800 text-gray-300 shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Image */}
        <div className="relative flex justify-center mb-6">
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Display the existing image or a placeholder if no image is currently available */}
            {currentEmployee.image && image == null ? (
              <img
                src={`${IMG_URL}/${currentEmployee.image}`}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            ) : image ? (
              <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(image)}
                alt="New Profile"
              />
            ) : (
              <FaUserAlt className="text-gray-400 text-4xl" />
            )}

            {/* Upload overlay or prompt */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                >
                  <p className="text-white">Upload</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* File input field */}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Editable Text */}
        {editMode ? (
          <>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="text-3xl font-semibold text-center mb-4 w-full outline-none rounded-md bg-gray-700 text-white ps-2"
            />
            <div className="flex items-center space-x-2 mb-2">
              <FaEnvelope className="text-sky-500" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="text-white w-full rounded-md bg-gray-700 outline-none ps-2"
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center mb-4 ps-2">
              {name}
            </h1>
            <div className="flex items-center space-x-2 mb-2">
              <FaEnvelope className="text-sky-500" />
              <p className="text-white ps-2">{email}</p>
            </div>
          </>
        )}

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaUserTag className="text-sky-500" />
            <p className="text-white ps-2">
              {formatRoleName(currentEmployee.role)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FaIdBadge className="text-sky-500" />
            <p className="text-white ps-2">{currentEmployee.employeeID}</p>
          </div>
        </div>

        <div className="text-center">
          {editMode ? (
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleUpdate}
                className="bg-sky-500 text-white p-2 rounded-lg min-w-20 text-sm hover:bg-sky-600 hover:scale-95 transition"
              >
                Update
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-sky-500 text-white p-2 rounded-lg min-w-20 text-sm hover:bg-sky-600 hover:scale-95 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-sky-500 text-white p-2 rounded-lg min-w-20 text-sm hover:bg-sky-600 hover:scale-95 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
