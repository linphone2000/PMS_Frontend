// Components
import EmployeeRow from "./EmployeeRow.jsx";
import EmployeeAddForm from "./EmployeeAddForm";
// Context
import { useAuth } from "../../../context/AuthContext";
// React
import { useState } from "react";
import { motion } from "framer-motion";
import { useUIModal } from "../../../context/UIModalContext.jsx";

const Employee = () => {
  // Context
  const { allEmployees, employeesLoading, currentEmployee } = useAuth();
  const { handleSetModalForm, handleOpenModal } = useUIModal();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);

  // Search
  const filteredEmployees = allEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleEmployeeAdd = () => {
    handleSetModalForm("employeeadd");
    handleOpenModal();
  };

  const handleEdit = (employeeId) => {
    setEditableRow(employeeId);
  };

  const handleCancelEdit = () => {
    setEditableRow(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-900 min-h-screen"
    >
      <div className="flex justify-between items-center mb-6">
        {/* Heading */}
        <h1 className="text-sky-50 text-2xl font-bold">Employees Overview</h1>

        <div className="flex gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search employees..."
            className="py-2 px-4 rounded-full border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Add */}
          <button
            className="py-2 px-4 bg-sky-700 text-white rounded-full hover:bg-sky-800 transition"
            onClick={() => handleEmployeeAdd()}
          >
            Add Employee
          </button>
        </div>
      </div>
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
        <thead className="bg-sky-700 text-gray-200">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Employee ID</th>
            <th className="p-4">Created At</th>
            <th className="p-4">Updated At</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-400 text-sm">
          {employeesLoading ? (
            <tr>
              <td colSpan="8" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No employees found.
              </td>
            </tr>
          ) : (
            filteredEmployees.map((employee) => {
              if (
                currentEmployee._id !== employee._id &&
                (employee.role !== "headAdmin" ||
                  currentEmployee.role !== "managerAdmin")
              ) {
                return (
                  <EmployeeRow
                    key={employee._id}
                    employee={employee}
                    isEditable={editableRow === employee._id}
                    onEdit={() => handleEdit(employee._id)}
                    onCancelEdit={handleCancelEdit}
                  />
                );
              } else {
                return null;
              }
            })
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Employee;
