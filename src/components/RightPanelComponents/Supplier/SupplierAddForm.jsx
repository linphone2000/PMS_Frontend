// shadcn ui
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// React
import { useRef } from "react";
// Context
import { useSupplier } from "../../../context/SupplierContext";
import { useUIModal } from "../../../context/UIModalContext";

const SupplierAddForm = () => {
  // Context
  const { registerSupplier } = useSupplier();
  const { handleCloseModal, showToast } = useUIModal();

  // Refs
  const supplierNameRef = useRef(null);
  const contactPersonRef = useRef(null);
  const contactNumberRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const contractStartDateRef = useRef(null);
  const contractEndDateRef = useRef(null);
  const paymentTermsRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supplierData = {
      supplierName: supplierNameRef.current.value,
      contactPerson: contactPersonRef.current.value,
      contactNumber: contactNumberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      contractStartDate: contractStartDateRef.current.value,
      contractEndDate: contractEndDateRef.current.value,
      paymentTerms: paymentTermsRef.current.value,
    };
    try {
      const response = await registerSupplier(supplierData);
      handleCloseModal();
      showToast("success", response.data.message);
    } catch (error) {
      console.error("Error adding supplier:", error);
      showToast("error", error.message);
    }
  };

  return (
    <>
      <div className="text-center bg-sky-700 py-6">
        <h1 className="text-3xl font-bold text-white">Add a New Supplier</h1>
      </div>
      {/* <hr className="border-t border-gray-200 w-full" /> */}
      <form
        className="px-8 py-6 bg-gray-900 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Supplier Name:</label>
            <input
              type="text"
              ref={supplierNameRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Contact Person:</label>
            <input
              type="text"
              ref={contactPersonRef}
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
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">
              Contract Start Date:
            </label>
            <input
              type="date"
              ref={contractStartDateRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">
              Contract End Date:
            </label>
            <input
              type="date"
              ref={contractEndDateRef}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-200">Payment Terms:</label>
            <input
              type="text"
              ref={paymentTermsRef}
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
            Add Supplier
          </button>
        </div>
      </form>
    </>
  );
};

export default SupplierAddForm;
