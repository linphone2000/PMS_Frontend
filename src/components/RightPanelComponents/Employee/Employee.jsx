// Components
import EmployeeRow from "./EmployeeRow.jsx";
// Context
import { useAuth } from "../../../context/AuthContext";
// React
import { useState } from "react";
import { motion } from "framer-motion";

const Employee = () => {
  const { allEmployees, employeesLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Search
  const filteredEmployees = allEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-900 min-h-screen"
    >
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          className="p-2 rounded-lg border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            filteredEmployees.map((employee) => (
              <EmployeeRow key={employee.employeeID} employee={employee} />
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Employee;
