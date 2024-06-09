// CSS
import"./InvoiceModal.css";
// Context
import { useOrder } from "../../../../context/OrderContext";
import { useUIModal } from "../../../../context/UIModalContext";

const InvoiceModal = () => {
  const { invoice } = useOrder();
  const { handleCloseModal } = useUIModal();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {invoice ? (
        <div className="print-container bg-white text-black p-6 max-w-3xl mx-auto border border-gray-300 shadow-sm font-mono">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Invoice Receipt
          </h2>
          <div className="mb-4">
            <p>
              <span className="font-bold inline-block w-36">Order ID:</span>{" "}
              {invoice._id}
            </p>
            <p>
              <span className="font-bold inline-block w-36">Order Date:</span>{" "}
              {new Date(invoice.orderDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold inline-block w-36">
                Customer Name:
              </span>{" "}
              {invoice.customerID.name}
            </p>
            <p>
              <span className="font-bold inline-block w-36">Email:</span>{" "}
              {invoice.customerID.email}
            </p>
            <p>
              <span className="font-bold inline-block w-36">
                Delivery Address:
              </span>{" "}
              {invoice.deliveryAddress}
            </p>
          </div>
          <table className="min-w-full mt-4 text-black border-collapse">
            <thead className="border-b-2 border-black">
              <tr>
                <th className="px-2 py-1 text-left">#</th>
                <th className="px-2 py-1 text-left">Item Name</th>
                <th className="px-2 py-1 text-left">Quantity</th>
                <th className="px-2 py-1 text-left">Price</th>
                <th className="px-2 py-1 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-dashed border-gray-300"
                >
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{item.itemName}</td>
                  <td className="px-2 py-1">{item.quantity}</td>
                  <td className="px-2 py-1">${item.price.toFixed(2)}</td>
                  <td className="px-2 py-1">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p>
              <span className="font-bold inline-block w-36">Total Price:</span>{" "}
              ${invoice.totalPrice.toFixed(2)}
            </p>
            <p>
              <span className="font-bold inline-block w-36">
                Payment Method:
              </span>{" "}
              {invoice.paymentMethod}
            </p>
            <p>
              <span className="font-bold inline-block w-36">Remarks:</span>{" "}
              {invoice.remarks}
            </p>
            <p>
              <span className="font-bold inline-block w-36">Status:</span>{" "}
              {invoice.status}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
            >
              Print
            </button>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default InvoiceModal;
