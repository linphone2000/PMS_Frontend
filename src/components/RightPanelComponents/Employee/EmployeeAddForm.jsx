import { useRef, useState } from "react";
// Context
import { useAuth } from "../../../context/AuthContext";
import { useUIModal } from "../../../context/UIModalContext";
// Components
import Tooltip from "../../Tooltip/Tooltip";

const EmployeeAddForm = () => {
  // Context
  const { register } = useAuth();
  const { handleCloseModal, showToast } = useUIModal();

  // Refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const employeeIDRef = useRef(null);
  const imageRef = useRef(null);

  // State
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [image, setImage] = useState();

  // Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = new FormData();
    employeeData.append("name", nameRef.current.value);
    employeeData.append("email", emailRef.current.value);
    employeeData.append("password", passwordRef.current.value);
    employeeData.append("employeeID", employeeIDRef.current.value);
    if (imageRef.current.files[0]) {
      employeeData.append("image", imageRef.current.files[0]);
    }

    // Log FormData
    for (let [key, value] of employeeData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await register(employeeData);
      handleCloseModal();
      showToast("success", "Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      showToast("error", error.message);
    }
  };

  const handleFileChange = async (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <>
      <div className="text-center bg-sky-700 py-6">
        <h1 className="text-3xl font-bold text-white">Add a New Employee</h1>
      </div>
      <form
        className="px-8 py-6 bg-gray-900 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Name:</label>
            <input
              type="text"
              ref={nameRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Email:</label>
            <input
              type="email"
              ref={emailRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Password:</label>
            <input
              type="password"
              ref={passwordRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Employee ID:</label>
            <div className="relative">
              <input
                ref={employeeIDRef}
                type="text"
                required
                placeholder="Employee ID"
                className="px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 w-full"
                onFocus={() => setTooltipVisible(true)}
                onBlur={() => setTooltipVisible(false)}
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              />
              <Tooltip
                message="Eg: HA0001, MA0001, CA0001, PA0001"
                isVisible={tooltipVisible}
              />
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <label className="block mb-1 text-gray-200">Image:</label>
            <input
              type="file"
              ref={imageRef}
              onChange={handleFileChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Employee Preview"
                className="mt-2 w-16 h-16 object-cover rounded-md"
              />
            )}
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
            Add Employee
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeAddForm;
