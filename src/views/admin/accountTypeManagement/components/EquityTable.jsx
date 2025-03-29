import React, { useState, useEffect, useCallback } from "react";
import Card from "components/card";
import dummyData from "../variables/faqDummy";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaEdit, FaEye } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import { MdOutlineDeleteOutline } from "react-icons/md";
import AddEquityAccount from "./AddEquityAccount";
import { toast, Toaster } from "react-hot-toast";
import AccountSize from "./AccountSize/index";
import { MdBlock } from "react-icons/md";
import axios from "axios";
import EquityEdit from "./EquityEdit"
import EquityDelete from "./EquityDelete"


const columnHelper = createColumnHelper();

function EquityTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState([{ id: "userID", desc: false }]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccT, setEditingAccT] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const fetchData = useCallback(async () => {
    const loadingToast = toast.loading("Updating Account Type details...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.dismiss(loadingToast);
            toast.error("Please login to access the data.");
            return;
        }

        const response = await axios.get(
            "https://capital-curve-apis.onrender.com/api/account-type/get-all-Equity-plan-and-addons-for-admin",
            {
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            }
        );

        if (response.data?.result) {
            setData(response.data.result.allPlan || []);
        } else {
            toast.error("No Data Found");
        }
    } catch (error) {
        toast.error("Failed to fetch data.");
        console.error("Failed to fetch data:", error);
    } finally {
        toast.dismiss(loadingToast);
    }
}, [setData]); // Ensure setData is included if it's from useState



  useEffect(() => {
    // Use all of the dummy data here
    fetchData();
    // setData(dummyData);
  }, [fetchData]);

  const handleViewClick = (row) => {
    // setSelectedRow(row.original);
    setEditingAccT(row.original);
  };

  const handleDeleteClick = (row) => {
    setIsDeleteModalOpen(true);
    setEditingAccT(row.original);
  };


   

  const columns = [
    columnHelper.accessor("id", {
      header: () => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">ID</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          <span className="text-blueSecondary dark:text-brand-400">{info.row.index + 1}</span>
        </p>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">Price</p>,
      cell: (info) => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor("accountSize", {
      header: () => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">Account Size</p>,
      cell: (info) => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor("videoUnlocked", {
      header: () => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">Video Unlocked</p>,
      cell: (info) => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor("status", {
      header: () => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">Status</p>,
      cell: (info) => (
        <div className="flex items-center justify-center">
          <p className={`text-sm font-bold w-16 text-gray-700 dark:text-navy-700 rounded-md text-center  ${info.getValue() === "Active" ? "bg-green-200" : "bg-red-200"}`}>
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.display({
      id: "Action",
      header: () => <p className="text-center text-sm font-bold text-gray-600 dark:text-white">Action</p>,
      cell: (info) => (
        <div className="flex items-center justify-center gap-4">
          <button aria-label="Edit"
            onClick={() => {
              handleViewClick(info.row);
              setIsEditModalOpen(true);
            }}
          >
            <FaEdit className="text-lg text-green-300" />
          </button>
          {/* <button aria-label="View" onClick={() => handleViewClick(info.row)}>
            <FaEye className="text-lg text-yellow-500" />
          </button> */}
          <button aria-label="Delete" onClick={() => handleDeleteClick(info.row)}>
            <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white flex justify-center items-center">
          {new Date(info.getValue()).toLocaleDateString()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Card extra="w-full sm:overflow-auto px-6 scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
        <Toaster />
        <header className="flex flex-col items-center justify-between gap-4 pt-4 md:flex-row">
          <div className="text-xl font-bold text-navy-700 dark:text-white">Account Size</div>
          <button
            className="flex items-center gap-2 rounded-md bg-blueSecondary p-2 text-white hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-brand-500"
            onClick={() => setIsModalOpen(true)}
          >
            <VscNewFile /> Add New Account Size
          </button>
        </header>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            {/* <AddEquityAccount
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddNewData}
            /> */}
            <AddEquityAccount
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={async (newData) => {
                if (!newData) {
                  toast.error("Invalid data!");
                  return;
                }
                toast.success("Data has been successfully added!");

                // Update local state immediately for a smoother UI experience
                setData((prevData) => [newData, ...prevData]);

                // Refetch data from the API to ensure consistency
                await fetchData();
              }}
            />
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <EquityEdit
              isOpen={isEditModalOpen}
              AccT={editingAccT}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={async (updatedData) => {
                if (!updatedData) {
                  toast.error("Invalid data!");
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
            <EquityDelete
              isOpen={isDeleteModalOpen}
              AccT={editingAccT}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={async (deletedAccT) => {
                if (!deletedAccT) {
                  // toast.error("Failed to delete FAQ");
                  return;
                }
                // toast.success("FAQ has been successfully deleted!");
                await fetchData(); // Refetch data after deleting
              }}
            />
          </div>
        )}


        <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-gray-400">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4">
                      {flexRender(header.column.columnDef.header, header.getContext())}

                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`min-w-[150px] border-white/0 py-3 pr-4 ${selectedRow?.id === row.original.id ? "rounded-xl" : ""
                        } ${index === 0 && selectedRow?.id === row.original.id ? "rounded-l-xl" : ""} 
          ${index === row.getVisibleCells().length - 1 && selectedRow?.id === row.original.id ? "rounded-r-xl" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>


          </table>
        </div>
      </Card>

      {/* {selectedRow && ( */}
        <div className="mt-6">
          <AccountSize  />
        </div>
      {/* )} */}
    </div>
  );
}

export default EquityTable;
