import { useState } from "react";
import Card from "components/card";
import { FaEdit, FaEye } from "react-icons/fa";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import User from "./UserList";
import Progress from "components/progress";
import { MdOutlineDeleteOutline, MdBlock } from "react-icons/md";

const columnHelper = createColumnHelper();

const AddOns = ({ User = [] }) => {
  const columns = [
    columnHelper.accessor("ID", {
      id: "ID",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">ID </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          <span className="text-blueSecondary dark:text-brand-400">#{info.getValue()}</span>
        </p>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Name</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Email", {
      id: "Email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Email</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Number", {
      id: "Number",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Phone</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Code", {
      id: "Code",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Code</p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Status", {
      id: "Status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status </p>
      ),
      cell: (info) => {
        const statusColor =
          info.getValue() === "Active"
            ? "bg-green-200"
            : info.getValue() === "Inactive"
              ? "bg-red-200"
              : "text-gray-500 bg-blue-200";
        return (
          <div className="flex justify-center items-center">
            <p className={`text-sm font-bold w-16 dark:text-navy-700 text-gray-700 rounded-md flex justify-center ${statusColor}`}>
              {info.getValue()}
            </p>

          </div>
        );
      },
    }),

    columnHelper.accessor("Usages", {
      id: "Usages",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          Usage Progress
        </p>
      ),
      cell: (info) => (
        <div className="mx-2 flex font-bold justify-center items-center ">

          {info.getValue() === 0 ? (
            <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">Unlimited</p>
          ) : (
            <>
              <Progress width="" value={info.getValue()} />
            </>
          )}
        </div>

      ),
    }),

    columnHelper.accessor("Usages", {
      id: "Usages",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          Used Limit
        </p>
      ),
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="mx-2 flex font-bold flex justify-center items-center">
            {value === 0 && (
              <p className="text-md font-medium text-gray-600 dark:text-white">
                {"0"}
              </p>
            )}
            {value > 0 && value <= 20 && (
              <p className="text-md font-medium text-red-400 ">
                {value}%
              </p>
            )}
            {value > 20 && value <= 50 && (
              <>
                <p className="text-md font-medium text-yellow-500 dark:text-yellow-500">
                  {value}%
                </p>
              </>
            )}
            {value > 50 && value <= 80 && (
              <>
                <p className="text-md font-medium text-green-400 dark:text-green-300">
                  {value}%
                </p>
              </>
            )}
            {value > 80 && value <= 100 && (
              <>
                <p className="text-md font-medium text-blue-400 ">
                  {value}%
                </p>
              </>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("Commission", {
      id: "Commission",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Total Comission</p>
      ),
      cell: (info) => (
        <p className="text-md font-medium flex justify-center items-center text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Action", {
      id: "Action",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Action</p>
      ),
      cell: (info) => (
        <div className="flex justify-center items-center gap-4">
          <button aria-label="Edit">
            <FaEdit className="text-green-300 text-lg" />
          </button>
          <button
            aria-label="Delete"
          // onClick={() => handleDelete(info.row.original.ID)}
          >
            <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
          </button>
          <button aria-label="Block">
            <MdBlock className="text-red-400 text-lg" />
          </button>
          <button aria-label="View">
            <FaEye className="text-yellow-500 text-lg" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: User,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (

    <Card extra="w-full sm:overflow-auto px-6 scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
      <header className="flex flex-col items-center justify-between gap-4 pt-6 md:flex-row">
        <div className="text-xl font-bold text-navy-700 dark:text-white">Add-Ons</div>
      </header>
      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start"
                  >
                    <div className="items-center justify-between text-xs text-gray-200">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-[150px] py-3 pr-4"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AddOns;

