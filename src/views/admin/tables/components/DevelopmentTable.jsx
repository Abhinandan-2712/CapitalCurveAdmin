import React, { useState, useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import defaultData from "../variables/tableData";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdBlock } from "react-icons/md";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();
const response2 = defaultData.concat([]);

function CheckTable() {
  // Initialize sorting with default configuration to show userID in ascending order
  const [sorting, setSorting] = React.useState([{ id: "userID", desc: false }]);
  // Pagination state
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalResults = defaultData.length;

  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [pageTable2, resultsPerPage]);






  function Pagination({ currentPage, totalResults, resultsPerPage, onChange }) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    return (
      <div className="flex justify-between mt-4 items-center">
        <div>
          <label htmlFor="pageLimit" className="mr-2 text-sm font-medium text-gray-600  dark:text-white">
            Rows per page:
          </label>
          <select
            id="pageLimit"
            className="px-2 py-1 text-sm text-gray-600 rounded bg-blueSecondary dark:bg-brand-400 "
            value={resultsPerPage}
            onChange={(e) => {
              setPageTable2(1); // Reset to the first page
              setResultsPerPage(Number(e.target.value));
            }}
          >
            <option value={5} >5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 text-sm rounded-lg ${index + 1 === currentPage ? ' bg-blueSecondary dark:bg-brand-400 text-white' : 'bg-white text-blueSecondary dark:text-brand-400 '
                }`}
              onClick={() => onChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Columns definition
  const columns = [
    columnHelper.accessor("userID", {
      id: "userID",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">User ID</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Email</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Phone No.</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Action", {
      id: "Action",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Action</p>
      ),
      cell: (info) => (
        <button className="text-sm font-bold flex items-center text-gray-600 gap-4 dark:text-white">
          <FaEdit className="text-green-300 text-base" />
          <MdOutlineDeleteOutline className="text-blue-400 text-xl" />
          <MdBlock className="text-red-400 text-xl" />
        </button>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
      ),
      cell: (info) => {
        const statusColor =
          info.getValue() === "Active"
            ? "bg-green-200"
            : info.getValue() === "Inactive"
              ? "bg-red-200"
              : "text-gray-500 bg-blue-200";
        return (
          <p className={`text-sm font-bold w-16 dark:text-navy-700 text-gray-700 rounded-md flex justify-center ${statusColor}`}>
            {info.getValue()}
          </p>
        );
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white">
          {new Date(info.getValue()).toLocaleDateString()}
        </p>
      ),
    }),
  ];

  // Table setup
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data: dataTable2,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // Pagination controls
  const totalPages = Math.ceil(response2.length / resultsPerPage);

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          User Table
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="flex items-center text-xl dark:text-gray-200 text-gray-600">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && <GoArrowUp />}
                        {header.column.getIsSorted() === "desc" && <GoArrowDown />}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="min-w-[150px] border-white/0 py-3 pr-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      <div className="py-4">
        <Pagination
          className="m-12"
          currentPage={pageTable2}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onChange={setPageTable2}
        />
      </div>

    </Card>
  );
}

export default CheckTable;
