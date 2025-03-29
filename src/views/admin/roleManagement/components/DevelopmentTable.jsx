import React, { useState, useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import defaultData from "../variables/tableData";
import { GoArrowUp, GoArrowDown } from "react-icons/go";



import { FaEdit, FaEye } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdBlock } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import AddNewAdmin from "./addNewAdmin";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ViewUserModal from "./ViewUserModal";
import UpdateSubAdmin from "./updateSubAdmin";

const columnHelper = createColumnHelper();
const response2 = defaultData.concat([]);

function CheckTable() {
  // Initialize sorting with default configuration to show userID in ascending order
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [sorting, setSorting] = React.useState([{ id: "userID", desc: false }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSelectedUser, setEditSelectedUser] = useState(null);
  const [editSelectedUserOpen, setEditSelectedUserOpen] = useState(false);

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
      <div className="flex justify-between my-6 items-center">
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
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">Team ID</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">NAME</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">Team Email</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-700 dark:text-white  flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Phone No.</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Role", {
      id: "Role",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">Role</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white  flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Action", {
      id: "Action",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">Action</p>
      ),
      cell: (info) => (
        <button className="text-sm font-bold flex items-center text-gray-600 gap-4 dark:text-white">
          <FaEdit className="text-green-300 text-base"
            onClick={() => {
              setEditSelectedUser(info.row.original);
              setEditSelectedUserOpen(true);

            }} />
          <MdOutlineDeleteOutline className="text-blue-400 text-xl" />
          <MdBlock className="text-red-400 text-xl" />
          <FaEye className=" text-yellow-500 text-base"
            onClick={() => {
              // setSelectdUser(info.row.original);
              setSelectedUser(info.row.original);
              setIsViewModalOpen(true);
            }} />
        </button>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">STATUS</p>
      ),
      cell: (info) => {
        const statusColor =
          info.getValue() === "Active"
            ? "bg-green-200"
            : info.getValue() === "Inactive"
              ? "bg-red-200"
              : "text-gray-500 bg-blue-200";
        return (
          <div className=" flex justify-center items-center">
            <p className={`text-sm font-bold w-16 dark:text-navy-700 text-gray-700 rounded-md flex justify-center ${statusColor}`}>
              {info.getValue()}
            </p>

          </div>

        );
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white  flex justify-center items-center">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white  flex justify-center items-center">
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
    // <Card extra={"w-full h-full sm:overflow-auto px-6"}>
    //   <header className="relative flex items-center justify-between pt-4">
    //     <div className="text-xl font-bold text-navy-700 dark:text-white">
    //       Team Table
    //     </div>
    //     {/* <CardMenu /> */}
    //     <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full md:w-auto">
    //       <div className="linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200 dark:bg-navy-900 dark:text-white w-full md:w-auto">
    //         {/* <div className="flex h-10 md:h-8 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
    //           <p className="pl-3 pr-1 text-xl">
    //             <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
    //           </p>
    //           <input
    //                             type="text"
    //                             placeholder="Search by Id, Question, Answer, Action.."
    //                             value={searchQuery}
    //                             onChange={(e) => setSearchQuery(e.target.value)}
    //                             className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
    //                         />
    //         </div> */}
    //       </div>
    //       <button
    //         className="text-white rounded-md p-2 flex justify-center items-center gap-2 bg-blueSecondary hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-brand-500 w-full md:w-auto"
    //         onClick={() => setIsModalOpen(true)}
    //       >
    //         <VscNewFile /> Add new

    //       </button>
    //     </div>
    //   </header>
    //   {
    //     isModalOpen && (
    //       <AddSubAdmin
    //       isOpen={isModalOpen}
    //       onClose={() => setIsModalOpen(false)}
    //       onSubmit={(newData) => {
    //           if(!newData){
    //               // toast.error("Invalid data!");
    //               return;
    //           }
    //           else{
    //               // toast.success("Data has been successfully added!");
    //           }
    //           setDataTable2((prevData) => [...prevData, newData]);
    //       }}/>
    //     )
    //   }

    //   <div className="mt-8 overflow-x-auto xl:overflow-x-auto">
    //     <table className="w-full">
    //       <thead>
    //         {table.getHeaderGroups().map((headerGroup) => (
    //           <tr key={headerGroup.id} className="!border-px !border-gray-400">
    //             {headerGroup.headers.map((header) => {
    //               return (
    //                 <th
    //                   key={header.id}
    //                   colSpan={header.colSpan}
    //                   onClick={header.column.getToggleSortingHandler()}
    //                   className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center"
    //                 >
    //                   <div className="flex justify-center items-center text-xl dark:text-gray-200 text-gray-600  ">
    //                     {flexRender(
    //                       header.column.columnDef.header,
    //                       header.getContext()
    //                     )}
    //                     {header.column.getIsSorted() === "asc" && <GoArrowUp />}
    //                     {header.column.getIsSorted() === "desc" && <GoArrowDown />}
    //                   </div>
    //                 </th>
    //               );
    //             })}
    //           </tr>
    //         ))}
    //       </thead>
    //       <tbody>
    //         {table.getRowModel().rows.map((row) => {
    //           return (
    //             <tr key={row.id}>
    //               {row.getVisibleCells().map((cell) => {
    //                 return (
    //                   <td
    //                     key={cell.id}
    //                     className="min-w-[150px] border-white/0 py-3 pr-4"
    //                   >
    //                     {flexRender(
    //                       cell.column.columnDef.cell,
    //                       cell.getContext()
    //                     )}
    //                   </td>
    //                 );
    //               })}
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>


    //   <div className="py-4">
    //     <Pagination
    //       className="m-12"
    //       currentPage={pageTable2}
    //       totalResults={totalResults}
    //       resultsPerPage={resultsPerPage}
    //       onChange={setPageTable2}
    //     />
    //   </div>

    // </Card>
    <Card extra={"w-full sm:overflow-auto px-6 mt-4"}>
      {/* <Toaster /> */}
      <header className="relative flex items-center justify-between pt-4">
        <div Codes className="text-xl font-bold text-navy-700 dark:text-white">
          Institute
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full md:w-auto">
          <div className="linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200 dark:bg-navy-900 dark:text-white w-full md:w-auto">
            <div className="flex h-10 md:h-8 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              <p className="pl-3 pr-1 text-xl">
                {/* <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" /> */}
              </p>
              <input
                type="text"
                placeholder="Search by Id, Question, Answer, Action.."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
              />
            </div>
          </div>
          <button
            className="text-white rounded-md p-2 flex justify-center items-center gap-2 bg-blueSecondary hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-brand-500 w-full md:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            <VscNewFile /> Add new

          </button>
        </div>
      </header>
      {isModalOpen && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center z-50 py-12 ">
          <AddNewAdmin
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(newData) => {
              if (!newData) {
                // toast.error("Invalid data!");
                return;
              }
              else {
                // toast.success("Data has been successfully added!");
              }
              setDataTable2((prevData) => [...prevData, newData]);
            }}
          />
        </div>
      )}
      {
        isViewModalOpen && <ViewUserModal user={selectedUser} onClose={() => setIsViewModalOpen(false)} />
      }
      {
        editSelectedUserOpen && <UpdateSubAdmin user={editSelectedUser} onClose={() => setEditSelectedUserOpen(false)} />
      }

      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white ">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
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
                    className="min-w-[150px] border-white/0 py-3 pr-4"
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

      {/* Pagination Controls */}
      <Pagination
        className="mb-12"
        currentPage={pageTable2}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onChange={setPageTable2}
      />
    </Card>
  );
}

export default CheckTable;
