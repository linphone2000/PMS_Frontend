// React
import { useNavigate } from "react-router-dom";
// Components
import InfoBox from "./InfoBox";
// Context
import { useUIModal } from "../../../context/UIModalContext";
import { useAuth } from "../../../context/AuthContext";
import { useInventory } from "../../../context/InventoryContext";
import { useSupplier } from "../../../context/SupplierContext";
import { useOrder } from "../../../context/OrderContext";
import { useCustomer } from "../../../context/CustomerContext";

const MiddleDashBoard = () => {
  // Context
  const { setSelectedPage } = useUIModal();
  const { allEmployees } = useAuth();
  const { allItems } = useInventory();
  const { allSuppliers } = useSupplier();
  const { allOrders } = useOrder();
  const { allCustomers } = useCustomer();

  // Navigation
  const navigate = useNavigate();

  // Handler
  const handleClick = (page) => {
    setSelectedPage(page);
    navigate("/" + page);
  };

  return (
    <div className="bg-sky-700 p-6 flex flex-col gap-4 text-sky-100 rounded-md mb-6">
      {/* Headings */}
      <div className="">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <h2 className="font-thin text-gray-300">
          A Quick Data Overview of the System
        </h2>
      </div>

      {/* Four Boxes */}
      <div className="flex justify-around gap-10">
        <InfoBox
          iconClass="fa-solid fa-capsules"
          title="Medicines"
          page="inventory"
          color="emerald"
          buttonText={`Total Items: ${allItems.length}`}
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-users"
          title="Employees"
          page="employee"
          color="yellow"
          buttonText={`Total Employees: ${allEmployees.length}`}
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-boxes-stacked"
          title="Orders"
          page="order"
          color="sky"
          buttonText={`Total Orders: ${allOrders.length}`}
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-truck-ramp-box"
          title="Suppliers"
          page="supplier"
          color="rose"
          buttonText={`Total Suppliers: ${allSuppliers.length}`}
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-user"
          title="Customers"
          page="customer"
          color="lime"
          buttonText={`Total Customers: ${allCustomers.length}`}
          onButtonClick={handleClick}
        />
      </div>
    </div>
  );
};

export default MiddleDashBoard;
