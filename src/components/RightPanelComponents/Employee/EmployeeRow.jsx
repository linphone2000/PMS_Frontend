// Utils
import { formatRoleName } from "../../../utils/formatter";

const EmployeeRow = ({ employee }) => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <tr className="hover:bg-sky-800 transition-colors duration-300">
      <td className="flex justify-center p-4 border-t border-gray-500">
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
      <td className="p-4 border border-gray-500">{employee.name}</td>
      <td className="p-4 border border-gray-500">{employee.email}</td>
      <td className="p-4 border border-gray-500">
        {formatRoleName(employee.role)}
      </td>
      <td className="p-4 border border-gray-500">{employee.employeeID}</td>
      <td className="p-4 border border-gray-500">
        {new Date(employee.createdAt).toLocaleString()}
      </td>
      <td className="p-4 border border-gray-500">
        {new Date(employee.updatedAt).toLocaleString()}
      </td>
    </tr>
  );
};

export default EmployeeRow;
