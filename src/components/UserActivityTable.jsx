import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getUserActivities } from "../services/userService";

const storedUnididId = JSON.parse(localStorage.getItem("userUnididId"));

const columns = [
  { accessorKey: "id", header: "Transaction ID" },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: (info) => {
      const isoString = new Date(info.getValue());
      const date = isoString.toLocaleDateString("en-IN");
      const time = isoString.toLocaleTimeString("en-IN");
      return `${date} ${time}`;
    },
  },
  { accessorKey: "action", header: "Function" },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span
          className={`px-2 py-1 rounded-md text-white text-xs sm:text-sm ${
            status === "Completed"
              ? "bg-green-600"
              : status === "Pending"
              ? "bg-yellow-500"
              : "bg-red-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

const UserActivityTable = () => {
  const [userActivities, setUserActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async (storedUnididId) => {
      if (storedUnididId) {
        try {
          const activities = await getUserActivities(storedUnididId);
          setUserActivities(activities);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchActivities(storedUnididId);
  }, []);
  const table = useReactTable({
    data: userActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className="p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl text-white  ">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      <div className="w-full overflow-auto  h-[30rem] rounded-lg">
        <table className="w-full text-left text-wrap">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-800 text-white ">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="sticky top-0 bg-gray-900/60 backdrop-blur px-4 py-2 min-w-[8rem] text-wrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-700 even:bg-gray-800 hover:bg-gray-700 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 sm:px-4 py-2 min-w-[8rem] text-wrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivityTable;
