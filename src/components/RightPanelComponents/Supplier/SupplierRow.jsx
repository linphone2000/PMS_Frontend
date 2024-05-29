// React
import { useState } from "react";
// Context
import { useSupplier } from "../../../context/SupplierContext";
import { useUIModal } from "../../../context/UIModalContext";

const SupplierRow = ({ supplier, isEditable, onEdit, onCancelEdit }) => {
  // Context
  const { updateSupplier, deleteSupplier } = useSupplier();
  const { showToast } = useUIModal();

  // States
  const [supplierName, setSupplierName] = useState(supplier.supplierName);
  const [contactPerson, setContactPerson] = useState(supplier.contactPerson);
  const [contactNumber, setContactNumber] = useState(supplier.contactNumber);
  const [email, setEmail] = useState(supplier.email);
  const [address, setAddress] = useState(supplier.address);
  const [contractStartDate, setContractStartDate] = useState(
    supplier.contractStartDate
  );
  const [contractEndDate, setContractEndDate] = useState(
    supplier.contractEndDate
  );
  const [paymentTerms, setPaymentTerms] = useState(supplier.paymentTerms);

  // Handlers
  const handleUpdate = async () => {
    const updatedSupplier = {
      _id: supplier._id,
      supplierName,
      contactPerson,
      contactNumber,
      email,
      address,
      contractStartDate,
      contractEndDate,
      paymentTerms,
    };

    try {
      await updateSupplier(updatedSupplier);
      showToast("success", "Supplier updated.");
      onCancelEdit();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${supplier.supplierName}?`
      )
    ) {
      try {
        const response = await deleteSupplier(supplier._id);
        showToast("success", response.data.message);
      } catch (error) {
        console.error("Error deleting supplier:", error);
        showToast("error", error.message);
      }
    }
  };

  return (
    <tr className="hover:bg-sky-800 transition-colors duration-300">
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {supplierName}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {contactPerson}
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
      <td className="p-4">
        {isEditable ? (
          <input
            type="date"
            value={contractStartDate}
            onChange={(e) => setContractStartDate(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {new Date(contractStartDate).toLocaleDateString()}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="date"
            value={contractEndDate}
            onChange={(e) => setContractEndDate(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {new Date(contractEndDate).toLocaleDateString()}
          </p>
        )}
      </td>
      <td className="p-4">
        {isEditable ? (
          <input
            type="text"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-md w-full bg-gray-700 text-white"
          />
        ) : (
          <p className="border border-transparent bg-transparent px-2 py-1 rounded-md w-full text-white">
            {paymentTerms}
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
  );
};

export default SupplierRow;
