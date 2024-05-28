// Utils
import { useAuth } from "../../../context/AuthContext";
import { formatRoleName } from "../../../utils/formatter";

const EmployeeRow = ({ employee }) => {
  // Context
  const { currentEmployee } = useAuth();

  // API
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <>
      {employee._id !== currentEmployee._id && (
        <tr className="hover:bg-sky-800 transition-colors duration-300">
          <td className="flex p-4">
            {employee.image ? (
              <img
                src={`${IMG_URL}/${employee.image}`}
                alt="Profile Picture"
                className="w-16 h-16 object-cover rounded-md"
              />
            ) : (
              <img
                src="default_profile.jpeg"
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
          </td>
          <td className="p-4">{employee.name}</td>
          <td className="p-4">{employee.email}</td>
          <td className="p-4">{formatRoleName(employee.role)}</td>
          <td className="p-4">{employee.employeeID}</td>
          <td className="p-4">
            {new Date(employee.createdAt).toLocaleString()}
          </td>
          <td className="p-4">
            {new Date(employee.updatedAt).toLocaleString()}
          </td>
          <td className="p-4 text-center">
            <i className="fa-solid fa-trash text-lg p-1.5 rounded-md text-gray-400 border border-gray-400 hover:cursor-pointer hover:border-red-500 hover:text-red-500 transition"></i>
          </td>
        </tr>
      )}
    </>
  );
};

export default EmployeeRow;
