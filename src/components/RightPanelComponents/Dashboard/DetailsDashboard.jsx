// React
import React, { useState, useEffect } from "react";
// Context
import { useOrder } from "../../../context/OrderContext";
// date-fns
import {
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  isWithinInterval,
} from "date-fns";
// Chart.js
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const DetailsDashboard = () => {
  // Context
  const { allOrders } = useOrder();

  // States
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

  const getSalesOverTimeData = () => {
    const data = filteredOrders.reduce((acc, order) => {
      const date = format(
        new Date(order.orderDate),
        filter === "daily" ? "HH:mm" : filter === "monthly" ? "dd" : "MM"
      );
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.totalPrice;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Total Sales",
          data: Object.values(data),
          fill: false,
          borderColor: "#4CAF50",
        },
      ],
    };
  };

  const getOrderStatusData = () => {
    const data = filteredOrders.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = 0;
      }
      acc[order.status] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Order Status",
          data: Object.values(data),
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getTotalSalesPerCustomerData = () => {
    const data = filteredOrders.reduce((acc, order) => {
      const customerName = order.customerID.name;
      if (!acc[customerName]) {
        acc[customerName] = 0;
      }
      acc[customerName] += order.totalPrice;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Total Sales per Customer",
          data: Object.values(data),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
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

          {/* Charts */}
          <div className="flex justify-evenly gap-4 mb-4">
            {/* Line */}
            <div className=" bg-gray-800 p-4 rounded-lg overflow-auto w-1/3 max-h-96">
              <h3 className="text-lg font-semibold mb-2">Sales Over Time</h3>
              <Line
                className=""
                data={getSalesOverTimeData()}
                options={{ maintainAspectRatio: false }}
              />
            </div>
            {/* Donut */}
            <div className=" bg-gray-800 p-4 rounded-lg overflow-auto w-1/3">
              <h3 className="text-lg font-semibold mb-2">
                Order Status Distribution
              </h3>
              <Doughnut className="" data={getOrderStatusData()} />
            </div>
            {/* Bar */}
            <div className=" bg-gray-800 p-4 rounded-lg overflow-auto w-1/3 max-h-96">
              <h3 className="text-lg font-semibold mb-2">
                Total Sales per Customer
              </h3>
              <Bar
                className=""
                data={getTotalSalesPerCustomerData()}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-sky-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Items
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No orders
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
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
                          {format(
                            new Date(order.orderDate),
                            "yyyy-MM-dd HH:mm"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p
                            className={`${
                              order.status === "Delivered"
                                ? "text-emerald-500 border-emerald-500"
                                : order.status === "Pending"
                                ? "text-amber-500 border-amber-500"
                                : "text-rose-500 border-rose-500"
                            } border text-center px-1 rounded-md`}
                          >
                            {order.status}
                          </p>
                        </td>
                        {/* show/hide */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="bg-sky-500 px-2 rounded-md py-1 hover:bg-sky-600 transition"
                            onClick={() => toggleOrderItems(order._id)}
                          >
                            {expandedOrder === order._id
                              ? "Hide Items"
                              : "View Items"}
                          </button>
                        </td>
                      </tr>

                      {/* show/hide */}
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
                            <td className="px-6 py-2"></td>
                            <td className="px-6 py-2"></td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDashboard;
