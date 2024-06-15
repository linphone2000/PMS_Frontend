// React
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// Context
import { useAuth } from "../../../context/AuthContext";
import { useInventory } from "../../../context/InventoryContext";
import { useSupplier } from "../../../context/SupplierContext";
import { useOrder } from "../../../context/OrderContext";
import { useCustomer } from "../../../context/CustomerContext";
// Component
import OverviewRow from "./OverviewRow";
import PrintContent from "./PrintContent";

const BottomDashboard = () => {
  // Context
  const { allEmployees } = useAuth();
  const { allItems } = useInventory();
  const { allSuppliers } = useSupplier();
  const { allOrders } = useOrder();
  const { allCustomers } = useCustomer();

  // Ref
  const printRef = useRef();

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "System Overview",
  });

  return (
    <div className="py-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-sky-100">System Overview</h1>
        <button
          onClick={handlePrint}
          className="py-2 px-4 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
        >
          Print
        </button>
      </div>
      <div>
        <PrintContent
          ref={printRef}
          allItems={allItems}
          allEmployees={allEmployees}
          allOrders={allOrders}
          allSuppliers={allSuppliers}
          allCustomers={allCustomers}
        />
      </div>
    </div>
  );
};

export default BottomDashboard;
