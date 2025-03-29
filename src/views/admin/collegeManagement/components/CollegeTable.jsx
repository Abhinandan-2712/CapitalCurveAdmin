import React, { useState, useEffect, useMemo } from "react";
import Progress from "components/progress";
import Card from "components/card";
import dummyData from "../variables/collegeDummy"; // Adjust path as needed
import UpdateCollege from "./updateCollege"
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
import { toast, Toaster } from "react-hot-toast"
import AddCollege from "./AddCollege";
import DeleteCollege from "./deleteCollege";
import BlockCollege from "./BlockCollege";
import { VscNewFile } from "react-icons/vsc";
import axios from "axios";

const columnHelper = createColumnHelper();


function CollegeTable({onRefresh}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pageTable2, setPageTable2] = useState(1); // Current page
    const [dataTable2, setDataTable2] = useState([]); // Data from API
    const [resultsPerPage, setResultsPerPage] = useState(10); // Items per page
    const [totalPages, setTotalPages] = useState(0); // Total pages from API
    const [totalRecords, setTotalRecords] = useState(0); // Total records from API
    const [editingCollege, setEditingCollege] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    const fetchData = async () => {
        const loadingToast = toast.loading("Updating college details...");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("Authentication required");
                return;
            }

            const response = await axios.get(
                `https://capital-curve-apis.onrender.com/api/college-type/get-allCollege?page=${pageTable2}&limit=${resultsPerPage}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );
            

            if (response.data && response.data.result) {
                setDataTable2(response.data.result.colleges || []);
                setTotalPages(response.data.result.totalPages || 0);
                setTotalRecords(response.data.result.totalRecords || 0);
                onRefresh(); 
                // toast.success("Successfully updated College data")
            } else {
                toast.error("No data found");
            }
        } catch (error) {
           
            console.error("Error fetching data:", error);
            toast.error("Failed to load Colleges");
        }
        finally{
            toast.dismiss(loadingToast);
        }
    };


    useEffect(() => {
        fetchData();
    }, [pageTable2, resultsPerPage]);

    const handleViewClick = (row) => {
        setEditingCollege(row.original);
    }; 

    const handleDeleteClick = (row) => {
        setIsDeleteModalOpen(true);
        setEditingCollege(row.original);
    };

    const filteredData = useMemo(() => {
        if (!searchQuery) return dataTable2; // Return all data if no search query
        return dataTable2.filter((item) =>
            ["ID", "collegeName", "collegeEmail", "collegeDomain", "phoneNumber", "collegeCode", "discountCode",].some((key) =>
                item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, dataTable2]);

    // useEffect(() => {
    //     // Filter the data first, then slice based on pagination
    //     const filtered = filteredData.slice(
    //         (pageTable2 - 1) * resultsPerPage,
    //         pageTable2 * resultsPerPage
    //     );
    //     setDataTable2(filtered);
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
        columnHelper.accessor("ID", {
            id: "ID",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Id </p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
                    <span className="text-blueSecondary dark:text-brand-400">{info.row.index + 1}</span>
                </p>
            ),
        }),
        columnHelper.accessor("collegeName", {
            id: "collegeName",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center"> College Name</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("collegeEmail", {
            id: "collegeEmail",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Email</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("collegeDomain", {
            id: "collegeDomain",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Domain Name</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("phoneNumber", {
            id: "phoneNumber",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Phone</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("collegeCode", {
            id: "collegeCode",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">College Code</p>
            ),
            cell: (info) => (
                <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("discountCode", {
            id: "discountCode",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Code</p>
            ),
            cell: (info) => (
                <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("Usages", {
            id: "Usages",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Total Users</p>
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
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status</p>
            ),
            cell: (info) => {
                const statusColor =
                    info.getValue() === "Active"
                        ? "bg-green-200"
                        : info.getValue() === "Blocked"
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
        columnHelper.accessor("totalComissions", {
            id: "totalComissions",
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
                        <FaEdit className="text-green-300 text-lg"
                            onClick={() => {
                                handleViewClick(info.row);
                                setIsEditModalOpen(true);
                            }} />
                    </button>
                    <button aria-label="Delete" onClick={() => handleDeleteClick(info.row)}>
                        <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
                    </button>
                    <button aria-label="Block"
                    onClick={()=>{
                        setIsBlockModalOpen(true);
                        setEditingCollege(info.row.original)
                    }}
                    >
                        <MdBlock className="text-red-400 text-lg" />
                    </button>
                    {/* <button aria-label="View">
                        <FaEye className="text-yellow-500 text-lg" />
                    </button> */}
                </div>
            ),
        }),
        columnHelper.accessor("updatedAt", {
            id: "updatedAt",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Date</p>,
            cell: (info) => {
                const date = new Date(info.getValue());
                const formattedDate = date.toLocaleDateString();
                return <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">{formattedDate}</p>;
            },
        }),
    ];

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

    return (
        <Card extra={"w-full sm:overflow-auto px-6 mt-4"}>
            <Toaster />
            <header className="relative flex items-center justify-between pt-4">
                <div Codes className="text-xl font-bold text-navy-700 dark:text-white">
                    Institute
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full md:w-auto">
                    <div className="linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200 dark:bg-navy-900 dark:text-white w-full md:w-auto">
                        <div className="flex h-10 md:h-8 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
                            <p className="pl-3 pr-1 text-xl">
                                <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
                            </p>
                            <input
                                type="text"
                                placeholder="Search by Id, Question, Answer, Action.."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
            {/* {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <AddCollege
                        isOpen={isEditModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={(newData) => {
                            if (!newData) {
                                toast.error("Invalid data!");
                                return;
                            }
                            else {
                                toast.success("Data has been successfully added!");
                            }
                            setDataTable2((prevData) => [...prevData, newData]);
                        }}
                    />
                </div>
            )} */}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <UpdateCollege
                        isOpen={isEditModalOpen}
                        College={editingCollege}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmit={async (updatedData) => {
                            if (!updatedData) {
                                // toast.error("Invalid data!");
                                return;
                            }
                            // toast.success("FAQ has been successfully updated!");
                            await fetchData();
                        }}
                    />
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <AddCollege
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={async (newData) => {
                            if (!newData) {
                                // toast.error("Invalid data!");
                                return;
                            }
                            // toast.success("Data has been successfully added!");

                            // Update local state immediately for a smoother UI experience
                            setDataTable2((prevData) => [newData, ...prevData]);

                            // Refetch data from the API to ensure consistency
                            await fetchData();
                        }}
                    />
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <DeleteCollege
                        isOpen={isDeleteModalOpen}
                        College={editingCollege}
                        onClose={() => setIsDeleteModalOpen(false)}
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
            {isBlockModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <BlockCollege
                        isOpen={isBlockModalOpen}
                        College={editingCollege}
                        onClose={() => setIsBlockModalOpen(false)}
                        onBlocked={async (college) => {
                            if (!college) {
                                // toast.error("Failed to delete College");
                                return;
                            }
                            // toast.success("College has been successfully deleted!");
                            await fetchData(); // Refetch data after deleting
                        }}
                    />
                </div>
            )}

            {/* {
                editSelectedUserOpen && <UpdateCollege user={editSelectedUser} onClose={() => setEditSelectedUserOpen(false)} />
            } */}

            <div className="mt-8 overflow-x-scroll ">
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
                currentPage={pageTable2}
                totalPages={totalPages}
                onChange={setPageTable2}
            />
        </Card>
    );
}

export default CollegeTable;
