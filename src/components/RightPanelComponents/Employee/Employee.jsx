// Components
import EmployeeRow from "./EmployeeRow.jsx";
// Context
import { useAuth } from "../../../context/AuthContext";

const Employee = () => {
  const { allEmployees, employeesLoading } = useAuth();

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <table className="w-full text-left border-collapse border border-sky-600 rounded-lg overflow-hidden">
        <thead className="bg-sky-600 text-gray-200">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Employee ID</th>
            <th className="p-4">Created At</th>
            <th className="p-4">Updated At</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-400 text-sm">
          {employeesLoading ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            allEmployees.map((employee) => (
              <EmployeeRow key={employee.employeeID} employee={employee} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
