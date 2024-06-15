// React
import { useState } from "react";
import { motion } from "framer-motion";
// shadcn ui
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// CSS
import "./Order.css";
// Component
import OrderRow from "./OrderRow";
// Context
import { useOrder } from "../../../context/OrderContext";
import { useUIModal } from "../../../context/UIModalContext";
import { useAuth } from "../../../context/AuthContext";
import NoAuthorization from "../../NoAuthorization/NoAuthorization";

const Orders = () => {
  // Context
  const { allOrders, ordersLoading } = useOrder();
  const { handleSetModalForm, handleOpenModal } = useUIModal();
  const { currentEmployee } = useAuth();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    customerName: true,
    items: true,
    quantity: true,
    price: true,
    totalPrice: true,
    orderDate: true,
    paymentMethod: true,
    deliveryAddress: true,
    remarks: true,
    status: true,
    actions: true,
  });

  const filteredOrders = allOrders
    .filter((order) =>
      order.customerID.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((order) =>
      statusFilter === "All" ? true : order.status === statusFilter
    );

  const handleOrderAdd = () => {
    handleSetModalForm("orderadd");
    handleOpenModal();
  };

  const handleEdit = (orderId) => {
    setEditableRow(orderId);
  };

  const handleCancelEdit = () => {
    setEditableRow(null);
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-900 min-h-screen"
    >
      {currentEmployee.role !== "headAdmin" &&
      currentEmployee.role !== "cashierAdmin" ? (
        <NoAuthorization />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            {/* Heading */}
            <h1 className="text-sky-50 text-2xl font-bold">Order Overview</h1>

            <div className="flex gap-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Search orders..."
                className="py-2 px-4 rounded-full border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Add */}
              <button
                className="py-2 px-4 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
                onClick={handleOrderAdd}
              >
                Add Order
              </button>
            </div>
          </div>

          {/* Separator */}
          <hr className="border-gray-500"></hr>

          <div className="flex gap-4 justify-end my-2">
            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Column Visibility Checkboxes */}
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="py-2 px-4 rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
              >
                Columns
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-white">
                <DropdownMenuLabel className="text-black">
                  Table Data
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                {Object.keys(visibleColumns).map((column) => (
                  <DropdownMenuItem
                    key={column}
                    asChild
                    className=""
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center space-x-2 p-2 rounded-md dropdown-label hover:cursor-pointer">
                      <Switch
                        checked={visibleColumns[column]}
                        onCheckedChange={() => toggleColumnVisibility(column)}
                        className="custom-switch"
                      />
                      <p className="text-black capitalize">
                        {column.replace(/([A-Z])/g, " $1")}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded-lg">
            <table className="w-full text-left border-collapse overflow-hidden">
              <thead className="bg-sky-700 text-gray-200">
                <tr>
                  {visibleColumns.customerName && (
                    <th className="p-4">Customer Name</th>
                  )}
                  {visibleColumns.items && <th className="p-4">Items</th>}
                  {visibleColumns.quantity && <th className="p-4">Quantity</th>}
                  {visibleColumns.price && <th className="p-4">Price</th>}
                  {visibleColumns.totalPrice && (
                    <th className="p-4">Total Price</th>
                  )}
                  {visibleColumns.orderDate && (
                    <th className="p-4">Order Date</th>
                  )}
                  {visibleColumns.paymentMethod && (
                    <th className="p-4">Payment Method</th>
                  )}
                  {visibleColumns.deliveryAddress && (
                    <th className="p-4">Delivery Address</th>
                  )}
                  {visibleColumns.remarks && <th className="p-4">Remarks</th>}
                  {visibleColumns.status && <th className="p-4">Status</th>}
                  {visibleColumns.actions && <th className="p-4">Actions</th>}
                </tr>
              </thead>
              <tbody className="bg-gray-800 text-gray-400 text-sm">
                {ordersLoading ? (
                  <tr>
                    <td colSpan="11" className="text-center p-4">
                      Loading...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center p-4">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <OrderRow
                      key={order._id}
                      order={order}
                      isEditable={editableRow === order._id}
                      onEdit={() => handleEdit(order._id)}
                      onCancelEdit={handleCancelEdit}
                      visibleColumns={visibleColumns}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Orders;
