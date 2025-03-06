import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import PasswordCell from "./PasswordCell";
import { getIdentities, deleteIdentity } from "../services/identityService";
import reverseDate from "../helper/DateReverser";
import { logUserActivity } from "../services/userService";

const columnHelper = createColumnHelper();

const Badge = ({ text, type }) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-semibold";
  if (type === "owned") {
    return (
      <span
        className={`${baseClasses} ${
          text === "You" ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {text}
      </span>
    );
  }
  if (type === "identity") {
    return (
      <span
        className={`${baseClasses} ${
          text === "number" ? "bg-green-600" : "bg-purple-600"
        }`}
      >
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </span>
    );
  }
  return <span className={baseClasses}>{text}</span>;
};

const walletId = JSON.parse(localStorage.getItem("walletId"));
const unididId = JSON.parse(localStorage.getItem("userUnididId"));

const MainTable = () => {
  const [category, setCategory] = useState("Government IDs");
  const [othersType, setOthersType] = useState("number");
  const [globalFilter, setGlobalFilter] = useState("");
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const [enhancedPrivacy, setEnhancedPrivacy] = useState(false);
  const [walletId, setWalletId] = useState("");
  const storedWalletId = JSON.parse(localStorage.getItem("walletId"));

  useEffect(() => {
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const identities = await getIdentities(storedWalletId);
        setAllData(identities);
      } catch (error) {
        console.error("Error fetching identities:", error);
        setAllData([]);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (!Array.isArray(allData)) {
     
      setTableData([]); 
      return;
    }
  
    if (category === "All") {
      setTableData(allData);
    } else if (category === "Others") {
      setTableData(
        allData.filter(
          (identity) =>
            identity.category === "Others" &&
            identity.identityType === othersType
        )
      );
    } else {
      setTableData(
        allData.filter((identity) => identity.category === category)
      );
    }
  }, [category, othersType, allData]);
 
  const filteredData = useMemo(() => {
    return tableData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
    );
  }, [tableData, globalFilter]);

  const handleDelete = useCallback(async (walletId, id, rowData) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const deletionRecord = {
        dateOfDeletion: new Date().toISOString(),
        function: "deleted from table",
        rowData,
      };

      try {
        await deleteIdentity(walletId, id);
        await logUserActivity(
          unididId,
          "Delete Identity",
          `${rowData.idname} was deleted from UniDID`,
          "Completed"
        );
        setDeletedRows((prev) => [...prev, deletionRecord]);
        setTableData((prev) => prev.filter((row) => row.id !== id));
      } catch (error) {
        console.error("Error deleting identity:", error);
        await logUserActivity(
          unididId,
          "Delete Identity",
          `Failed to delete ${rowData.idname} from UniDID`,
          "Failed"
        );
        alert("Error deleting identity. Please try again.");
      }
    }
  }, []);

  const rowNumberColumn = columnHelper.display({
    id: "rowNumber",
    header: "#",
    cell: (info) => info.row.index + 1,
  });

  const govEduColumns = useMemo(() => {
    const cols = [];
    if (category === "Others") {
      cols.push(
        columnHelper.accessor(() => othersType, {
          id: "identityType",
          header: "Identity Type",
          cell: (info) => <Badge text={info.getValue()} type="identity" />,
        })
      );
    }
    cols.push(
      rowNumberColumn,
      columnHelper.accessor("idname", {
        header: "ID Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("idOwned", {
        header: "ID Owned",
        cell: (info) => <Badge text={info.getValue()} type="owned" />,
      }),
      columnHelper.accessor("idnum", {
        header: "ID Number",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("dateOfIssue", {
        header: "Date Issued",
        cell: (info) => reverseDate(info.getValue().toString()),
      }),
      columnHelper.accessor("dateAdded", {
        header: "Date Added",
        cell: (info) => reverseDate(info.getValue().toString().split("T")[0]),
      }),
      columnHelper.accessor("uploadedFile", {
        header: "File Upload",
        cell: (info) => {
          const file = info.getValue();
          return file ? (
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              Yes
            </a>
          ) : (
            "no"
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            className="bg-red-600 px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
            onClick={() =>
              handleDelete(walletId, info.row.original.id, info.row.original)
            }
          >
            Delete
          </button>
        ),
      })
    );
    return cols;
  }, [category, othersType, handleDelete, rowNumberColumn]);

  const socialsColumns = useMemo(() => {
    const cols = [];
    if (category === "Others") {
      cols.push(
        columnHelper.accessor(() => othersType, {
          id: "identityType",
          header: "Identity Type",
          cell: (info) => <Badge text={info.getValue()} type="identity" />,
        })
      );
    }
    cols.push(
      rowNumberColumn,
      columnHelper.accessor("idname", {
        header: "Website Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("username", {
        header: "Username",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("password", {
        header: "Password",
        cell: (info) => (
          <PasswordCell
            value={info.getValue()}
            enhancedPrivacy={enhancedPrivacy}
          />
        ),
      }),
      columnHelper.accessor("idOwned", {
        header: "Account Owned",
        cell: (info) => <Badge text={info.getValue()} type="owned" />,
      }),
      columnHelper.accessor("webUrl", {
        header: "Website URL",
        cell: (info) => (
          <a
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("dateAdded", {
        header: "Date Added",
        cell: (info) => reverseDate(info.getValue().toString().split("T")[0]),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            className="bg-red-600 px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
            onClick={() =>
              handleDelete(walletId, info.row.original.id, info.row.original)
            }
          >
            Delete
          </button>
        ),
      })
    );
    return cols;
  }, [category, othersType, handleDelete, enhancedPrivacy, rowNumberColumn]);

  const columns = useMemo(() => {
    if (
      category === "Socials" ||
      (category === "Others" && othersType === "password")
    ) {
      return socialsColumns;
    } else {
      return govEduColumns;
    }
  }, [category, othersType, govEduColumns, socialsColumns]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="min-h-screen  p-2 sm:p-4 rounded-lg text-white">
      <div className="mb-4 flex flex-wrap gap-4">
        {["Government IDs", "Educational IDs", "Socials", "Others"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors font-title font-medium enabled:font-bold ${
                category === cat
                  ? "bg-white/90 text-[#2b4162] "
                  : "bg-[#2b4162] text-white  hover:bg-white/90 hover:text-[#2b4162]"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {category === "Others" && (
        <div className="mb-4 flex gap-4">
          {["Number Based", "Password Based"].map((type) => (
            <button
              key={type}
              onClick={() => {
                type === "Password Based"
                  ? setOthersType("password")
                  : setOthersType("number");
              }}
              className={`px-4 py-2 rounded-2xl transition-colors font-title font-medium enabled:font-bold ${
                othersType === type
                  ? "bg-white/90 text-[#2b4162] "
                  : "bg-[#2b4162] text-white  hover:bg-white/90 hover:text-[#2b4162]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      <div className="mb-4 flex items-center ">
        <input
          type="checkbox"
          id="enhancedPrivacy"
          checked={enhancedPrivacy}
          onChange={(e) => setEnhancedPrivacy(e.target.checked)}
          className="mr-2 p-1 w-3 h-3 cursor-pointer bg-[#2b4162]"
        />
        <label htmlFor="enhancedPrivacy">Enhanced Privacy</label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 rounded-xl w-full text-white bg-[#2b4162] enabled:bg-white enabled:text-[#2b4162] hover:border-none hover:ring-2 hover:ring-white/90 hover:bg-[#2b4162] hover:outline-none "
          style={{
            fontSize: "1rem",
            backgroundColor: "#2b4162",
            border: "none",
            color: "#FFFFFF",
          }}
        />
      </div>

      <div className="overflow-x-auto scroll-smooth rounded-lg">
        <table className="min-w-full border-collapse ">
          <thead className="bg-[#2b4162] text-white sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border-b border-gray-700 text-left"
                    style={{ fontSize: "1rem" }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : "default",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span
                          style={{
                            display: "inline-block",
                            width: "1.5rem",
                            textAlign: "center",
                          }}
                        >
                          {{
                            asc: "🔼",
                            desc: "🔽",
                          }[header.column.getIsSorted()] ?? ""}
                        </span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 text-white/90 font-title font-medium text-md lg:text-xl"
                >
                  No identities found. Add Identities to view here!
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-500/40 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 border-b border-gray-700"
                      style={{ fontSize: "1rem" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <button
            className="px-3 py-1 bg-[#2b4162] text-white rounded-3xl mr-2 hover:bg-white/90 hover:text-[#2b4162] font-title font-medium transition-colors"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            &lt;&lt; Previous
          </button>
          <button
            className="px-3 py-1 bg-[#2b4162] text-white rounded-3xl hover:bg-white/90 hover:text-[#2b4162] font-title font-medium transition-colors"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next &gt;&gt;
          </button>
        </div>
        <span style={{ fontSize: "1rem" }}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};

export default MainTable;
