import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"

import EditVideo from "./EditVideo";
import DeleteVideo from "./DeleteVideo"
import PlayVideo from "./PlayVideo"



const columnHelper = createColumnHelper();


function CheckTable({onRefresh}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = React.useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const fetchData = useCallback(async () => {
    const loadingToast = toast.loading("Updating Course details...");

    try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.dismiss(loadingToast);
            toast.error("Please login to access the data", { duration: 3000 });
            return;
        }

        const response = await axios.get(
            `https://capital-curve-apis.onrender.com/api/admin/get-all-video?page=${pageTable2}&limit=${resultsPerPage}`,
            { headers: { "Content-Type": "application/json", token } }
        );

        if (response.data?.result?.videos?.length>0) {
            toast.success("Course fetched successfully!");
            setDataTable2(response.data.result.videos || []);
            setTotalRecord(response.data.result.totalRecords || 0);
            onRefresh()
        } else {
            toast.error("No data found");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch data";
        console.error("Failed to fetch data:", errorMessage);
        toast.error(errorMessage);
    } finally {
        toast.dismiss(loadingToast);
    }
}, [pageTable2, resultsPerPage]);



  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClick = (row) => {
    setEditingVideo(row.original);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setEditingVideo(row.original);
    // console.log(row.original);
    setIsDeleteModalOpen(true);
  };
  const handlePlayClick = (row) => {
    const videoUrl = row.original.videos?.videoUrl || row.original.videoUrl;
    if (!videoUrl) {
      toast.error("Video URL not found");
      return;
    }
    setPlayingVideo("https://capital-curve-apis.onrender.com/" + videoUrl);
    setIsPlayModalOpen(true);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return dataTable2
    return dataTable2.filter((item) =>
      ["_id", "title", "thumbnail", "description", "duration", "updatedAt"].some((key) =>
        item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery, dataTable2]
    // ["ID", "Title", "Description"].some((key) =>
    //   item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    // )
  );

  // useEffect(() => {

  //   const filtered = filteredData.slice(
  //     (pageTable2 - 1) * resultsPerPage,
  //     pageTable2 * resultsPerPage
  //   );
  //   setDataTable2(filtered);
  // }, [pageTable2, resultsPerPage, searchQuery]);





  function Pagination({ currentPage, totalPages, onChange }) {
    return (
      <div className="flex justify-between mt-4 py-5 items-center">
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
    columnHelper.accessor("_id", {
      id: "_id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">Sr No. </p>
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
    columnHelper.accessor("thumbnail", {
      id: "thumbnail",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Thumbnail</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
          {console.log(info.getValue())}
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={"https://capital-curve-apis.onrender.com/" + info.getValue()}
            alt="User thumbnail"
          />

        </p>
      ),
    }),
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
          <button aria-label="Edit" onClick={() => {
            handleEditClick(info.row);
            setIsEditModalOpen(true);
          }}>
            <FaEdit className="text-green-300 text-lg" />
          </button>
          <button
            aria-label="Delete"
            onClick={() => handleDeleteClick(info.row)}
          >
            <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
          </button>

          <button aria-label="Play" onClick={() => handlePlayClick(info.row)}>
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
        <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">DATE</p>
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
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // Pagination controls


  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6 scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white"}>
      <Toaster />
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Video Library
        </div>
        {/* <CardMenu /> */}
        <button className=" linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200  dark:bg-navy-800 dark:text-white">

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
          <EditVideo
            isOpen={isEditModalOpen}
            videos={editingVideo}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={async (updatedData) => {
              if (!updatedData) {
                toast.error("Invalid data");
                return;
              }
              // toast.success("Video successfully updated!");
              await fetchData();
              setIsEditModalOpen(false);
            }}
          />

        </div>
      )
      }

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <DeleteVideo
            isOpen={isDeleteModalOpen}
            videos={editingVideo}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={async (deletingVideo) => {
              if (!deletingVideo) {
                toast.error("Invalid data");
                return;
              }
              // toast.success("Video has been successfully deleted!");
              await fetchData();
              setIsDeleteModalOpen(false);
            }}
          />


        </div>
      )}
      {isPlayModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">

          <PlayVideo
            isOpen={isPlayModalOpen}
            videoUrl={playingVideo}
            onClose={() => setIsPlayModalOpen(false)}
          />
        </div>
      )}



      <div className="mt-8 overflow-x-scroll scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white ">
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
        <Pagination
          currentPage={pageTable2}
          totalPages={Math.ceil(totalRecord / resultsPerPage)}
          onChange={setPageTable2}
        />
      </div>

    </Card>
  );
}

export default CheckTable;
