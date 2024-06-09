import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useCustomer } from "../../../context/CustomerContext";
import { useInventory } from "../../../context/InventoryContext";
import { useOrder } from "../../../context/OrderContext";
import { useSupplier } from "../../../context/SupplierContext";
import {
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  isWithinInterval,
} from "date-fns";

const DetailsDashboard = () => {
  const { allEmployees } = useAuth();
  const { allCustomers } = useCustomer();
  const { allItems } = useInventory();
  const { allOrders } = useOrder();
  const { allSuppliers } = useSupplier();

  const [filter, setFilter] = useState("daily");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    filterOrders();
  }, [filter, allOrders]);

  const filterOrders = () => {
    const now = new Date();
    let startDate;

    if (filter === "daily") {
      startDate = startOfDay(now);
    } else if (filter === "monthly") {
      startDate = startOfMonth(now);
    } else if (filter === "yearly") {
      startDate = startOfYear(now);
    }

    const filtered = allOrders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return isWithinInterval(orderDate, { start: startDate, end: now });
    });

    setFilteredOrders(filtered);
  };

  const calculateTotalSales = () => {
    return filteredOrders.reduce((total, order) => total + order.totalPrice, 0);
  };

  const toggleOrderItems = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-gray-900 text-sky-100">
      {/* Heading */}
      <h2 className="text-2xl py-4 font-semibold text-sky-100">
        Sales Report for (
        {filter === "daily"
          ? "Today"
          : filter === "monthly"
          ? "This Month"
          : "This Year"}
        )
      </h2>

      <div className="details-dashboard bg-gray-800 p-4 rounded-lg text-sky-100 mb-6">
        {/* Filters */}
        <div className="filters flex space-x-4 mb-4">
          <button
            onClick={() => setFilter("daily")}
            className={`px-4 py-2 rounded-md ${
              filter === "daily"
                ? "bg-sky-500 text-white"
                : "bg-sky-200 text-sky-700"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`px-4 py-2 rounded-md ${
              filter === "monthly"
                ? "bg-sky-500 text-white"
                : "bg-sky-200 text-sky-700"
            }`}
          >
            This month
          </button>
          <button
            onClick={() => setFilter("yearly")}
            className={`px-4 py-2 rounded-md ${
              filter === "yearly"
                ? "bg-sky-500 text-white"
                : "bg-sky-200 text-sky-700"
            }`}
          >
            This year
          </button>
        </div>

        <div className="sales-report p-4 rounded-md shadow-md bg-gray-900">
          {/* Total */}
          <p className="text-lg mb-4">
            Total Sales: ${calculateTotalSales().toFixed(2)}
          </p>

          {/* Table */}
          <div className="rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-sky-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Items
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {filteredOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.customerID.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(new Date(order.orderDate), "yyyy-MM-dd HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => toggleOrderItems(order._id)}
                          className="px-2 py-1 bg-gray-600 text-white rounded-md"
                        >
                          {expandedOrder === order._id
                            ? "Hide Items"
                            : "View Items"}
                        </button>
                      </td>
                    </tr>
                    {expandedOrder === order._id &&
                      order.items.map((item, index) => (
                        <tr
                          key={`${order._id}-${index}`}
                          className="bg-gray-800"
                        >
                          <td
                            colSpan="2"
                            className="px-6 py-2 whitespace-nowrap"
                          >
                            Item Name: {item.itemName}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            Quantity: {item.quantity}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            Single Price: ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap"></td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDashboard;
