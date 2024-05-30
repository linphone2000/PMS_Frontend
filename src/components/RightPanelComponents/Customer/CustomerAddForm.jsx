import { useRef, useState } from "react";
// Context
import { useCustomer } from "../../../context/CustomerContext";
import { useUIModal } from "../../../context/UIModalContext";

const CustomerAddForm = () => {
  // Context
  const { addCustomer } = useCustomer();
  const { handleCloseModal, showToast } = useUIModal();

  // Refs
  const nameRef = useRef(null);
  const contactNumberRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);

  // Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = {
      name: nameRef.current.value,
      contactNumber: contactNumberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
    };

    try {
      const response = await addCustomer(customerData);
      handleCloseModal();
      showToast("success", "Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error);
      showToast("error", error.message);
    }
  };

  return (
    <>
      <div className="text-center bg-sky-700 py-6">
        <h1 className="text-3xl font-bold text-white">Add a New Customer</h1>
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
            <label className="block mb-1 text-gray-200">Contact Number:</label>
            <input
              type="text"
              ref={contactNumberRef}
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
            <label className="block mb-1 text-gray-200">Address:</label>
            <input
              type="text"
              ref={addressRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
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
            Add Customer
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerAddForm;
