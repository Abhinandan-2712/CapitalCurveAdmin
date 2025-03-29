import React, { useState, useEffect, useMemo } from "react";
import Progress from "components/progress";
import Card from "components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdBlock } from "react-icons/md";
import ViewUser from "./ViewUser";
import DeleteUser from "./UserDelete"
import UserBlock from "./UserBlock";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const columnHelper = createColumnHelper();

function CollegeTable() {

  const [isViewUser, setIsViewUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState([]);
  // Pagination state
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0)
  const [editUser, setEditUser] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);


  const fetchData = async () => {
    const loadingToast = toast.loading("Fetching User data...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss(loadingToast)
        toast.error("Authentication required")
      }
      console.log()
      const response = await axios.get(
        `https://capital-curve-apis.onrender.com/api/user/get-all-user?page=${pageTable2}&limit=${resultsPerPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token
          }
        }
      );
      console.log(response)

      if (response.data?.result?.user?.length > 0 && response.data) {
        setDataTable2(response.data.result.user || []);
        setTotalPage(response.data.result.totalPages || 0);
        setTotalRecord(response.data.result.totalRecords || 0)
        toast.success("User data Fetched successfully")
      }
      else {
        toast.error("No data found")
      }
    }
    catch (error) {
      console.error("Error fetching data", error);
      toast.error("faoled to load User data");
    }
    finally {
      toast.dismiss(loadingToast)
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageTable2, resultsPerPage])



  const handleViewClick = (row) => {
    setEditUser(row.original);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return dataTable2; // Return all data if no search query
    return dataTable2.filter((item) =>
      ["ID", "createdAt", "fullName", "userId", "email", "mobileNumber", "referralCode"].some((key) =>
        item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, dataTable2]);

  // useEffect(() => {
  //   // Filter the data first, then slice based on pagination
  //   const filtered = filteredData.slice(
  //     (pageTable2 - 1) * resultsPerPage,
  //     pageTable2 * resultsPerPage
  //   );
  //   setDataTable2(filtered);
  // }, [pageTable2, resultsPerPage, searchQuery]);


  function Pagination({ currentPage, totalPages, onChange }) {
    return (
      <div className="flex justify-between mt-4 py-5 items-center">
        <Toaster />
        <div>
          <label
            htmlFor="pageLimit"
            className="mr-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Rows per page:
          </label>
          <select
            id="pageLimit"
            className="px-2 py-1 text-sm text-gray-600 rounded bg-blueSecondary dark:bg-brand-400"
            value={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(Number(e.target.value));
              setPageTable2(1); // Reset to the first page when changing items per page
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 text-sm rounded-lg ${index + 1 === currentPage
                ? "bg-blueSecondary dark:bg-brand-400 text-white"
                : "bg-white text-blueSecondary dark:text-brand-400"
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

  const columns = [
    columnHelper.accessor("ID", {
      id: "ID",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">ID </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          <span className="text-blueSecondary dark:text-brand-400">#{info.row.index + 1}</span>
        </p>
      ),
    }),
    columnHelper.accessor("userId", {
      id: "userId",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">User Id </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          <span className="text-blueSecondary dark:text-brand-400">{info.getValue()}</span>
        </p>
      ),
    }),
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: "fullName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Email</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("mobileNumber", {
      id: "mobileNumber",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Phone</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("referralCode", {
      id: "referralCode",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Code</p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("RefferalBy", {
      id: "RefferalBy",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Refferal By</p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("aadharCard", {
      id: "aadharCard",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">AAdhar Number</p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("panCard", {
      id: "panCard",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Pan Number</p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status </p>
      ),
      cell: (info) => {
        const statusColor =
          info.getValue() === "Active"
            ? "bg-green-200"
            : info.getValue() === "Delete"
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

    // columnHelper.accessor("Usages", {
    //   id: "Usages",
    //   header: () => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
    //       Video Progress
    //     </p>
    //   ),
    //   cell: (info) => (
    //     <div className="mx-2 flex font-bold justify-center items-center ">

    //       {info.getValue() === 0 ? (
    //         <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">Unlimited</p>
    //       ) : (
    //         <>
    //           <Progress width="" value={info.getValue()} />
    //         </>
    //       )}
    //     </div>

    //   ),
    // }),

    // columnHelper.accessor("Usages", {
    //   id: "Usages",
    //   header: () => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
    //       Used Limit
    //     </p>
    //   ),
    //   cell: (info) => {
    //     const value = info.getValue();

    //     return (
    //       <div className="mx-2 flex font-bold justify-center items-center">
    //         {value === 0 && (
    //           <p className="text-md font-medium text-gray-600 dark:text-white">
    //             {"0"}
    //           </p>
    //         )}
    //         {value > 0 && value <= 40 && (
    //           <p className="text-md font-medium text-green-300 dark:text-green-400">
    //             {value}%
    //           </p>
    //         )}
    //         {value > 40 && value <= 70 && (
    //           <>
    //             <p className="text-md font-medium text-yellow-500 dark:text-yellow-500">
    //               {value}%
    //             </p>
    //           </>
    //         )}
    //         {value > 70 && value <= 100 && (
    //           <>
    //             <p className="text-md font-medium text-red-400 dark:text-red-300">
    //               {value}%
    //             </p>
    //           </>
    //         )}

    //       </div>
    //     );
    //   },
    // }),
    columnHelper.accessor("accountBalance", {
      id: "accountBalance",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Account Balance</p>
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
          <button aria-label="Edit" onClick={() => {
            handleViewClick(info.row);
            setIsEditModalOpen(true);
          }}>
            <FaEdit className="text-green-300 text-lg"
            />
          </button>
          <button
            aria-label="Delete"
            onClick={() => {
              handleViewClick(info.row);
              setIsDeleteModalOpen(true)
            }}
          >
            <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
          </button>
          <button aria-label="Block"
          onClick={()=>{
            setEditUser(info.row.original);
            setIsBlockModalOpen(true);
          }}>
            <MdBlock className="text-red-400 text-lg" />
          </button>
          {/* <button aria-label="View">
            <FaEye className="text-yellow-500 text-lg"
              onClick={() => {
                setSelectedUser(info.row.original)
                setIsViewUser(true);
                // setS

              }}
            />
          </button> */}
        </div>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Date</p>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toLocaleDateString();
        return <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">{formattedDate}</p>;
      },
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });


  return (
    <Card extra={"w-full sm:overflow-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white px-6 mt-4"}>
      <header className="relative flex items-center justify-between pt-4">
        <div Codes className="text-xl font-bold text-navy-700 dark:text-white">
          User Management
        </div>

        <button className=" linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200  dark:bg-navy-900 dark:text-white">

          <div className="flex h-8 w-auto items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-1 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              placeholder="Search by ID, Name, Email, Code, Platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
            />
          </div>
        </button>
      </header>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <ViewUser
            isOpen={isEditModalOpen}
            user={editUser}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={async (updatedData) => {
              if (!updatedData) {
                // toast.error("Invalid data!");
                return;
              }
              // toast.success("FAQ has been successfully updated!");
              await fetchData(); // Refetch data after updating
            }}
          />
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <DeleteUser
            isOpen={isDeleteModalOpen}
            User={editUser}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={async (user) => {
              if (!user) {
                // toast.error("Failed to delete College");
                return;
              }
              // toast.success("College has been successfully deleted!");
              await fetchData(); // Refetch data after deleting
            }}
          />
        </div>
      )}
      {isBlockModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <UserBlock
            isOpen={isBlockModalOpen}
            User={editUser}
            onClose={() => setIsBlockModalOpen(false)}
            onDelete={async (deletedFAQ) => {
              if (!deletedFAQ) {
                // toast.error("Failed to delete College");
                return;
              }
              // toast.success("College has been successfully deleted!");
              await fetchData(); // Refetch data after deleting
            }}
          />
        </div>
      )}

      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white ">
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
      {/* {
        isViewUser && <ViewUser user={selectedUser} onClose={() => setIsViewUser(false)} />
      } */}


      {/* Pagination Controls */}
      <Pagination
        currentPage={pageTable2}
        totalPages={totalPage}
        onChange={setPageTable2}
      />
    </Card>
  );
}

export default CollegeTable;
