import React from "react";
// Component
import OverviewRow from "./OverviewRow";

const PrintContent = React.forwardRef(
  ({ allItems, allEmployees, allOrders, allSuppliers, allCustomers }, ref) => (
    <div ref={ref} className=" bg-gray-900 min-h-screen">
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
          <OverviewRow
            title="Medicines"
            items={allItems}
            columns={["Item Name", "Quantity", "Price"]}
            renderItem={(item) => (
              <tr key={item._id}>
                <td className="p-2">{item.itemName}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price}</td>
              </tr>
            )}
          />
          <OverviewRow
            title="Employees"
            items={allEmployees}
            columns={["Name", "ID", "Role"]}
            renderItem={(employee) => (
              <tr key={employee._id}>
                <td className="p-2">{employee.name}</td>
                <td className="p-2">{employee.employeeID}</td>
                <td className="p-2">{employee.role}</td>
              </tr>
            )}
          />
          <OverviewRow
            title="Orders"
            items={allOrders}
            columns={["Order ID", "Total Price", "Date"]}
            renderItem={(order) => (
              <tr key={order._id}>
                <td className="p-2">{order._id}</td>
                <td className="p-2">${order.totalPrice}</td>
                <td className="p-2">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
              </tr>
            )}
          />
          <OverviewRow
            title="Suppliers"
            items={allSuppliers}
            columns={["Supplier Name", "Contact Person", "Email"]}
            renderItem={(supplier) => (
              <tr key={supplier._id}>
                <td className="p-2">{supplier.supplierName}</td>
                <td className="p-2">{supplier.contactPerson}</td>
                <td className="p-2">{supplier.email}</td>
              </tr>
            )}
          />
          <OverviewRow
            title="Customers"
            items={allCustomers}
            columns={["Name", "Email", "Contact Number"]}
            renderItem={(customer) => (
              <tr key={customer._id}>
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.contactNumber}</td>
              </tr>
            )}
          />
        </tbody>
      </table>
    </div>
  )
);

export default PrintContent;
