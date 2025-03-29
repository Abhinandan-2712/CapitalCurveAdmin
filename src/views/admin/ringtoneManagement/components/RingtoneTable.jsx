import React, { useState, useEffect, useCallback, useMemo } from "react";
import Card from "components/card";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { FaEdit, FaEye, FaPlay, FaGooglePlay } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdBlock } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import EditRingtone from "./EditRingtone";
import DeleteRingtone from "./DeleteRingtone"
import PlayRingtone from "./PlayRingtone"


const columnHelper = createColumnHelper();


function CheckTable({onRefresh}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = React.useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [editingRingtone, setEditingRingtone] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [playingRingtone, setPlayingRingtone] = useState(null);


  const fetchData = useCallback(async () => {
    const loadingToast = toast.loading("Updating Ringtone details...");

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login", { duration: 3000 });
        return;
      }

      const response = await axios.get(
        `https://capital-curve-apis.onrender.com/api/ringtone/get-all-audio?page=${pageTable2}&limit=${resultsPerPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );

      if (response.data?.result?.audios?.length > 0) {
        setDataTable2(response.data.result.audios || []);
        setTotalRecord(response.data.result.totalRecords || 0);
        toast.success("ringtone loaded successfully!");
        onRefresh()
      } else {
        toast.error("No ringtone records found.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load ringtones.";
      console.error("Error fetching ringtones:", errorMessage);
      toast.error(errorMessage, { duration: 3000 });
    } finally {
      toast.dismiss(loadingToast);
    }
  }, [pageTable2, resultsPerPage]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const handleEditClick = (row) => {
    setEditingRingtone(row.original);
    setIsEditModalOpen(true);
  }

  const handleDeleteClick = (row) => {
    setIsDeleteModalOpen(true);
    setEditingRingtone(row.original);
  }

  const handlePlayClick = (row) => {
    const audioUrl = row.original.audioUrl
    if (!audioUrl) {
      toast.error("No Audio available")
      return;
    }
    setIsPlayModalOpen(true);
    setPlayingRingtone("https://capital-curve-apis.onrender.com/" + audioUrl);
  }

  const filteredData = useMemo(() => {
    if (!searchQuery) return dataTable2
    return dataTable2.filter((item) =>
      ["_id", "title", "description", "duration", "updatedAt"].some((key) =>
        item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery, dataTable2])






  function Pagination({ currentPage, totalPages, onChange }) {
    return (
      <div className="flex justify-between mt-4 py-5 items-center">
        <div>
          <label htmlFor="pageLimit" className="mr-2 text-sm font-medium text-gray-600 dark:text-white">
            Rows per page:
          </label>
          <select
            id="pageLimit"
            className="px-2 py-1 text-sm text-gray-600 rounded bg-blueSecondary dark:bg-brand-400"
            value={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(Number(e.target.value));
              setPageTable2(1);
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
    columnHelper.accessor("_id", {
      id: "_id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">Id </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          <span className="text-blueSecondary dark:text-brand-400">{info.row.index + 1}</span>
        </p>
      ),
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Title </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    // columnHelper.accessor("Thumbnail", {
    //   id: "Thumbnail",
    //   header: () => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Thumbnail</p>
    //   ),
    //   cell: (info) => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">

    //       <img
    //         className="h-12 w-12 rounded-full object-cover"
    //         src={info.getValue()}
    //         alt="User thumbnail"
    //       />
    //     </p>
    //   ),
    // }),
    columnHelper.accessor("description", {
      id: "description",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Description</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white w-72 flex justify-center items-center">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("duration", {
      id: "duration",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Duration</p>
      ),
      cell: (info) => (
        <div className="flex justify-center items-center">
          <p className=" w-16 text-center  bg-blue-200 text-sm font-bold dark:text-navy-700 text-gray-700 rounded-md ">

            {info.getValue()}


          </p>

        </div>

      ),
    }),
    columnHelper.accessor("Action", {
      id: "Action",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Action</p>
      ),
      cell: (info) => (
        <div className="flex justify-center items-center gap-4">
          <button aria-label="Edit"
            onClick={() => {
              handleEditClick(info.row);
              // setIsEditModalOpen(true)
            }}>
            <FaEdit className="text-green-300 text-lg" />
          </button>
          <button aria-label="Delete"
            onClick={() => handleDeleteClick(info.row)}
          >
            <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
          </button>
          <button aria-label="View" onClick={() => handlePlayClick(info.row)} >
            <FaGooglePlay className="text-yellow-500 text-lg" />
          </button>
        </div>
      ),

    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status</p>
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
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Date</p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-white flex justify-center items-center">
          {new Date(info.getValue()).toLocaleDateString()}
        </p>
      ),
    }),
  ];

  // Table setup
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });



  return (
    <Card extra={"w-full h-full sm:overflow-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white px-6"}>
      <Toaster />
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Ringtone Library
        </div>
        {/* <CardMenu /> */}
        <button className=" linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200  dark:bg-navy-900 dark:text-white">

          <div className="flex h-8 w-auto items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-1 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              placeholder="Search by Id, Title, Status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
            />
          </div>
        </button>
      </header>
      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <DeleteRingtone
              isOpen={isDeleteModalOpen}
              audios={editingRingtone}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={async (deleteRingtone) => {
                if (!deleteRingtone) {
                  toast.error("Please select a ringtone")
                  return;
                }
                // toast.success("Ringtone has been successfully deleted!");
                await fetchData()
                setIsDeleteModalOpen(false)
              }}
            />

          </div>
        )
      }
      {
        isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <EditRingtone
              isOpen={isEditModalOpen}
              ringtone={editingRingtone}
              onClose={() => setIsEditModalOpen(false)}
              onSave={async (updatedData) => {
                if (!updatedData) {
                  toast.error("Please fill all the fields")
                  return;
                }
                // await updateRingtone(editedRingtone)
                // toast.success("Video has been successfully edited!");
                await fetchData()
                setIsEditModalOpen(false)
              }}
            />
          </div>
        )
      }
      {isPlayModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">

          <PlayRingtone
            isOpen={isPlayModalOpen}
            audioUrl={playingRingtone}
            onClose={() => setIsPlayModalOpen(false)}
          />
        </div>
      )}


      <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white ">
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
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center"
                    >
                      <div className="flex justify-center items-center text-xl dark:text-gray-200 text-gray-600">
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
        <Pagination currentPage={pageTable2} totalPages={Math.ceil(totalRecord / resultsPerPage)} onChange={setPageTable2} />
      </div>

    </Card>
  );
}

export default CheckTable;
