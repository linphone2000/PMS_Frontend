const OverviewRow = ({ title, items, columns, renderItem }) => (
  <tr>
    <td className="p-4 font-semibold text-sky-100 bg-gray-800">{title}</td>
    <td className="p-4">
      <table className="w-full border-collapse rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            {columns.map((column, index) => (
              <th key={index} className="p-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-gray-400">
          {items.length > 0 ? (
            items.map((item) => renderItem(item))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
);

export default OverviewRow;
