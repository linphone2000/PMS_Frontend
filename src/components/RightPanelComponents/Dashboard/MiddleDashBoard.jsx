// React
import { useNavigate } from "react-router-dom";
// Components
import InfoBox from "./InfoBox";
import ReportBox from "./ReportBox";
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
  const [totalItems, setTotalItems] = useState(0);
  const [expiredItems, setExpiredItems] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [mostSoldItem, setMostSoldItem] = useState({ itemName: "", count: 0 });
  const [leastSoldItem, setLeastSoldItem] = useState({
    itemName: "",
    count: 0,
  });
  const [totalSales, setTotalSales] = useState(0);

  // Effects
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

  useEffect(() => {
    const itemCounts = {};

    allOrders.forEach((order) => {
      order.items.forEach((item) => {
        itemCounts[item.itemName] =
          (itemCounts[item.itemName] || 0) + item.quantity;
      });
    });

    const mostSold = Object.entries(itemCounts).reduce(
      (acc, [itemName, count]) => {
        if (count > acc.count) {
          return { itemName, count };
        }
        return acc;
      },
      { itemName: "", count: 0 }
    );

    const leastSold = Object.entries(itemCounts).reduce(
      (acc, [itemName, count]) => {
        if (acc.count === 0 || count < acc.count) {
          return { itemName, count };
        }
        return acc;
      },
      { itemName: "", count: 0 }
    );

    setMostSoldItem(mostSold);
    setLeastSoldItem(leastSold);
  }, [allOrders]);

  useEffect(() => {
    const total = allOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    setTotalSales(total);
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
      <div className="grid grid-cols-2 justify-evenly gap-10">
        <ReportBox
          title="Inventory"
          mainStat={allItems.length}
          mainStatLabel="Total number of medicine"
          secondaryStat={expiredItems.length}
          secondaryStatLabel="Expired medicine"
          handleClick={handleClick}
          page="inventory"
        />
        <ReportBox
          title="Sales"
          mainStat={totalItems}
          mainStatLabel="Quantity of medicine sold"
          secondaryStat={filteredOrders.length}
          secondaryStatLabel="Number of pending orders"
          handleClick={handleClick}
          page="order"
        />
        <ReportBox
          title="Most Sold Item"
          mainStat={mostSoldItem.count}
          mainStatLabel="Quantity Sold"
          secondaryStat="Medicine Name"
          secondaryStatLabel={mostSoldItem.itemName}
          handleClick={handleClick}
          page="inventory"
        />
        <ReportBox
          title="Total Sales"
          mainStat={`$${totalSales.toFixed(2)}`}
          mainStatLabel="Total Sales Amount"
          secondaryStat=""
          secondaryStatLabel=""
          handleClick={handleClick}
          page="sales"
        />
      </div>
    </div>
  );
};

export default MiddleDashBoard;
