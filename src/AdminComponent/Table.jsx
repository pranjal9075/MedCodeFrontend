const Table = ({ columns, data, onDelete }) => {
  return (
    <table className="min-w-full border">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col) => (
            <th key={col} className="p-2 border">{col}</th>
          ))}
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="text-center border">
            {columns.map((col) => (
              <td key={col} className="p-2 border">{row[col.toLowerCase().replace(" ", "_")]}</td>
            ))}
            <td className="p-2 border">
              <button className="bg-blue-400 px-2 py-1 rounded mr-2">View</button>
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button
                onClick={() => onDelete(row.id)}
                className="bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
