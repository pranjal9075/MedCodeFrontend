import React from "react";

const ResponsiveTable = ({ columns, data, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-2 md:p-3 text-left text-xs md:text-sm">{col}</th>
            ))}
            <th className="p-2 md:p-3 text-left text-xs md:text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50 transition-all">
              {Object.keys(row).filter(k => k !== 'id').map((key, i) => (
                <td key={i} className="p-2 md:p-3 text-xs md:text-sm truncate max-w-[150px]">{row[key]}</td>
              ))}
              <td className="p-2 md:p-3 flex gap-1 md:gap-2">
                <button onClick={() => onView(row)} className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-blue-600">👁️</button>
                <button onClick={() => onEdit(row)} className="bg-[#4a7c6f] text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-[#3d6659]">✏️</button>
                <button onClick={() => onDelete(row.id)} className="bg-red-500 text-white px-2 md:px-3 py-1 rounded text-xs hover:bg-red-600">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
