import React, { useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useInventory } from "../../../context/InventoryContext";
import { useSupplier } from "../../../context/SupplierContext";
import { useOrder } from "../../../context/OrderContext";
import { useCustomer } from "../../../context/CustomerContext";

const BottomDashboard = () => {
  const { allEmployees } = useAuth();
  const { allItems } = useInventory();
  const { allSuppliers } = useSupplier();
  const { allOrders } = useOrder();
  const { allCustomers } = useCustomer();

  return (
    <div className="py-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-sky-100">System Overview</h1>
      </div>
      <table
        id="system-overview-table"
        className="w-full text-left border-collapse rounded-lg overflow-hidden"
      >
        <thead className="bg-sky-700 text-gray-200">
          <tr>
            <th className="p-4">Section</th>
            <th className="p-4">Details</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-400 text-sm">
          <tr>
            <td className="p-4">Medicines</td>
            <td className="p-4">
              <ul>
                {allItems.map((item) => (
                  <li key={item._id}>
                    {item.itemName} (Qty: {item.quantity}, Price: ${item.price})
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="p-4">Employees</td>
            <td className="p-4">
              <ul>
                {allEmployees.map((employee) => (
                  <li key={employee._id}>
                    {employee.name} (ID: {employee.employeeID}, Role:{" "}
                    {employee.role})
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="p-4">Orders</td>
            <td className="p-4">
              <ul>
                {allOrders.map((order) => (
                  <li key={order._id}>
                    Order ID: {order._id}, Total Price: ${order.totalPrice},
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="p-4">Suppliers</td>
            <td className="p-4">
              <ul>
                {allSuppliers.map((supplier) => (
                  <li key={supplier._id}>
                    {supplier.supplierName} (Contact: {supplier.contactPerson},
                    Email: {supplier.email})
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="p-4">Customers</td>
            <td className="p-4">
              <ul>
                {allCustomers.map((customer) => (
                  <li key={customer._id}>
                    {customer.name} (Email: {customer.email}, Contact:{" "}
                    {customer.contactNumber})
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BottomDashboard;
