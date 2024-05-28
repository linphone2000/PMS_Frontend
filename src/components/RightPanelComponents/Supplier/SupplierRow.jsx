// Context
import { useSupplier } from "../../../context/SupplierContext";
import { useUIModal } from "../../../context/UIModalContext";

const SupplierRow = ({ supplier }) => {
  // Context
  const { deleteSupplier } = useSupplier();
  const { showToast } = useUIModal();

  // Handlers
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
      <td className="p-4">{supplier.supplierName}</td>
      <td className="p-4">{supplier.contactPerson}</td>
      <td className="p-4">{supplier.contactNumber}</td>
      <td className="p-4">{supplier.email}</td>
      <td className="p-4">{supplier.address}</td>
      <td className="p-4">
        {new Date(supplier.contractStartDate).toLocaleDateString()}
      </td>
      <td className="p-4">
        {new Date(supplier.contractEndDate).toLocaleDateString()}
      </td>
      <td className="p-4">{supplier.paymentTerms}</td>
      <td className="p-4 text-center">
        <i
          className="fa-solid fa-trash text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-red-500 hover:text-red-500 transition"
          onClick={handleDelete}
        ></i>
      </td>
    </tr>
  );
};

export default SupplierRow;
