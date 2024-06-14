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
import { useEffect, useState } from "react";
import countTotalItems from "@/utils/count";
import getExpiredItems from "@/utils/expired";
import filterPendingOrders from "@/utils/pending";

const MiddleDashBoard = () => {
  // Context
  const { setSelectedPage } = useUIModal();
  const { allEmployees } = useAuth();
  const { allItems } = useInventory();
  const { allSuppliers } = useSupplier();
  const { allOrders } = useOrder();
  const { allCustomers } = useCustomer();

  // States
  const [totelItems, setTotalItems] = useState(0);
  const [expiredItems, setExpiredItems] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Effect
  useEffect(() => {
    const total = countTotalItems(allOrders);
    setTotalItems(total);
  }, [allOrders]);

  useEffect(() => {
    const expired = getExpiredItems(allItems);
    setExpiredItems(expired);
  }, [allItems]);

  useEffect(() => {
    const filtered = filterPendingOrders(allOrders);
    setFilteredOrders(filtered);
  }, [allOrders]);

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

      <hr className="my-4 border-sky-500"></hr>

      {/* Reports */}
      <div className="flex justify-evenly gap-10">
        {/* 1st box */}
        <div className="w-3/5 border bg-sky-800 border-sky-300 rounded-md">
          <div className="flex justify-between px-4 py-2 rounded-md items-center">
            <p className="font-semibold text-lg">Inventory</p>
            <div
              onClick={() => handleClick("inventory")}
              className="flex gap-2 items-center font-extralight text-sm hover:scale-95 transition hover:cursor-pointer"
            >
              <p className="text-sky-300">Go to Inventory</p>
              <i className="fa-solid fa-angles-right text-sky-300"></i>
            </div>
          </div>
          <hr className="mx-4 border-sky-500"></hr>
          <div className="flex justify-between px-4 py-2 rounded-md">
            <div className="">
              <p className="font-bold text-lg">{allItems.length}</p>
              <p>Total number of medicine</p>
            </div>
            <div className="">
              <div className="">
                <p className="font-bold text-lg">{expiredItems.length}</p>
                <p>Expired medicine</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd box */}
        <div className="w-3/5 border bg-sky-800 border-sky-300 rounded-md">
          <div className="flex justify-between px-4 py-2 rounded-md items-center">
            <p className="font-semibold text-lg">Sales</p>
            <div
              onClick={() => handleClick("order")}
              className="flex gap-2 items-center font-extralight text-sm hover:scale-95 transition hover:cursor-pointer"
            >
              <p className="text-sky-300">Go to Orders</p>
              <i className="fa-solid fa-angles-right text-sky-300"></i>
            </div>
          </div>
          <hr className="mx-4 border-sky-500"></hr>
          <div className="flex justify-between px-4 py-2 rounded-md">
            <div className="">
              <p className="font-bold text-lg">{totelItems}</p>
              <p>Quantity of medicine sold</p>
            </div>
            <div className="">
              <div className="">
                <p className="font-bold text-lg">{filteredOrders.length}</p>
                <p>Number of pending order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleDashBoard;
