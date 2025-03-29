// import React, { useState, useEffect, useMemo } from "react";
// import Card from "components/card";
// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from "@tanstack/react-table";
// import { FiSearch } from "react-icons/fi";
// import { FaEdit, FaEye } from "react-icons/fa";
// import { VscNewFile } from "react-icons/vsc";
// import AddInfluencerModal from "./InfluencerModal";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import FAQUpdate from "./FAQUpdate";
// import DeleteFAQ from "./DeleteFAQ";

// const columnHelper = createColumnHelper();

// function FAQTable() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sorting, setSorting] = useState([]);
//     const [pageTable2, setPageTable2] = useState(1); // Current page
//     const [dataTable2, setDataTable2] = useState([]); // Data from API
//     const [resultsPerPage, setResultsPerPage] = useState(10); // Items per page
//     const [totalPage, setTotalPage] = useState(0); // Total pages from API
//     const [totalRecord, setTotalRecord] = useState(0); // Total records from API
//     const [editingFAQ, setEditingFAQ] = useState(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


//     // Fetch data from API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     toast.error("Authentication required");
//                     return;
//                 }

//                 const response = await axios.get(
//                     `https://capital-curve-apis.onrender.com/api/faq/get-all-faq?page=${pageTable2}&limit=${resultsPerPage}`,
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             token: token,
//                         },
//                     }
//                 );

//                 if (response.data && response.data.result) {
//                     setDataTable2(response.data.result.FAQ || []);
//                     setTotalPage(response.data.result.totalPage || 0);
//                     setTotalRecord(response.data.result.totalRecord || 0);
//                 } else {
//                     toast.error("No data found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 toast.error("Failed to load FAQs");
//             }
//         };
//         fetchData();
//     }, [pageTable2, resultsPerPage]);

//     const handleViewClick = (row) => {
//         setEditingFAQ(row.original);
//     };

//     const handleDeleteClick = (row) => {
//         setIsDeleteModalOpen(true);
//         setEditingFAQ(row.original);
//     }

//     // Handle search query (client-side filtering)
//     const filteredData = useMemo(() => {
//         if (!searchQuery) return dataTable2; // Return all data if no search query
//         return dataTable2.filter((item) =>
//             ["id", "question", "answer", "status", "updatedAt"].some((key) =>
//                 item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
//             )
//         );
//     }, [searchQuery, dataTable2]);

//     // Pagination component
//     function Pagination({ currentPage, totalPages, onChange }) {
//         return (
//             <div className="flex justify-between mt-4 py-5 items-center">
//                 <div>
//                     <label
//                         htmlFor="pageLimit"
//                         className="mr-2 text-sm font-medium text-gray-600 dark:text-white"
//                     >
//                         Rows per page:
//                     </label>
//                     <select
//                         id="pageLimit"
//                         className="px-2 py-1 text-sm text-gray-600 rounded bg-blueSecondary dark:bg-brand-400"
//                         value={resultsPerPage}
//                         onChange={(e) => {
//                             setResultsPerPage(Number(e.target.value));
//                             setPageTable2(1); // Reset to the first page when changing items per page
//                         }}
//                     >
//                         <option value={5}>5</option>
//                         <option value={10}>10</option>
//                         <option value={20}>20</option>
//                     </select>
//                 </div>
//                 <div>
//                     {[...Array(totalPages)].map((_, index) => (
//                         <button
//                             key={index}
//                             className={`px-3 py-1 mx-1 text-sm rounded-lg ${index + 1 === currentPage
//                                 ? "bg-blueSecondary dark:bg-brand-400 text-white"
//                                 : "bg-white text-blueSecondary dark:text-brand-400"
//                                 }`}
//                             onClick={() => onChange(index + 1)}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     // Table columns
//     const columns = [
//         columnHelper.accessor("_id", {
//             id: "_id",
//             header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Sr No</p>,
//             cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center"><span className="text-blueSecondary dark:text-brand-400"> {info.row.index + 1}</span></p>,
//         }),
//         columnHelper.accessor("question", {
//             id: "question",
//             header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Question</p>,
//             cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">{info.getValue()}</p>,
//         }),
//         columnHelper.accessor("answer", {
//             id: "answer",
//             header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Answer</p>,
//             cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">{info.getValue()}</p>,
//         }),
//         columnHelper.accessor("status", {
//             id: "status",
//             header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status</p>,
//             cell: (info) => {
//                 const statusColor =
//                     info.getValue() === "Active"
//                         ? "bg-green-200"
//                         : info.getValue() === "Inactive"
//                             ? "bg-red-200"
//                             : "text-gray-500 bg-blue-200";
//                 return (
//                     <div className="flex justify-center items-center">
//                         <p className={`text-sm font-bold w-16 dark:text-navy-700 text-gray-700 rounded-md flex justify-center ${statusColor}`}>
//                             {info.getValue()}
//                         </p>
//                     </div>
//                 );
//             },
//         }),
//         columnHelper.accessor("updatedAt", {
//             id: "updatedAt",
//             header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Date</p>,
//             cell: (info) => {
//                 const date = new Date(info.getValue());
//                 const formattedDate = date.toLocaleDateString();
//                 return <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">{formattedDate}</p>;
//             },
//         }),
//         columnHelper.display({
//             id: "Action",
//             header: () => (
//                 <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Action</p>
//             ),
//             cell: (info) => (
//                 <div className="flex justify-center items-center gap-4">
//                     <button aria-label="Edit" onClick={() => {
//                         handleViewClick(info.row)
//                         setIsEditModalOpen(true);
//                     }}>
//                         <FaEdit className="text-green-300 text-lg" />

//                     </button>
//                     <button aria-label="View"
//                         onClick={() => { handleDeleteClick(info.row) }}>
//                         <FaEye className="text-yellow-500 text-lg" />
//                     </button>
//                 </div>
//             ),
//         }),
//     ];


//     const table = useReactTable({
//         data: filteredData,
//         columns,
//         state: {
//             sorting,
//         },
//         onSortingChange: setSorting,
//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         debugTable: true,
//     });

//     return (
//         <Card extra={"w-full sm:overflow-auto px-6 scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white mt-4"}>
//             <Toaster />
//             <header className="relative flex flex-col md:flex-row items-center justify-between pt-4 gap-4 md:gap-0">
//                 <div className="text-xl font-bold text-navy-700 dark:text-white">Question & Answer</div>
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full md:w-auto">
//                     <div className="linear rounded-full bg-lightPrimary p-2 text-base font-medium text-brand-500 transition duration-200 dark:bg-navy-900 dark:text-white w-full md:w-auto">
//                         <div className="flex h-10 md:h-8 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
//                             <p className="pl-3 pr-1 text-xl">
//                                 <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
//                             </p>
//                             <input
//                                 type="text"
//                                 placeholder="Search by Id, Question, Answer, Action.."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
//                             />
//                         </div>
//                     </div>
//                     <button
//                         className="text-white rounded-md p-2 flex justify-center items-center gap-2 bg-blueSecondary hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-brand-500 w-full md:w-auto"
//                         onClick={() => setIsModalOpen(true)}
//                     >
//                         <VscNewFile /> Add new
//                     </button>
//                 </div>
//             </header>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
//                     <AddInfluencerModal
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         onSubmit={(newData) => {
//                             if (!newData) {
//                                 toast.error("Invalid data!");
//                                 return;
//                             }
//                             toast.success("Data has been successfully added!");
//                             setDataTable2((prevData) => [...prevData, newData]);
//                         }}
//                     />
//                 </div>
//             )}
//             {isEditModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
//                     <FAQUpdate
//                         isOpen={isEditModalOpen}
//                         faq={editingFAQ} 
//                         onClose={() => setIsEditModalOpen(false)}
//                         onSubmit={(updatedData) => {
//                             if (!updatedData) {
//                                 toast.error("Invalid data!");
//                                 return;
//                             }
//                             toast.success("FAQ has been successfully updated!");

//                             // Update the data in the table
//                             setDataTable2((prevData) =>
//                                 prevData.map((faq) =>
//                                     faq._id === updatedData._id ? updatedData : faq
//                                 )
//                             );

//                             setIsEditModalOpen(false);
//                         }}
//                     />
//                 </div>
//             )}

//             {isDeleteModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
//                     <DeleteFAQ
//                         isOpen={isDeleteModalOpen}
//                         faq={editingFAQ}  
//                         onClose={() => setIsDeleteModalOpen(false)}
//                         onDelete={(deletedFAQ) => {
//                             if (!deletedFAQ) {
//                                 toast.error("Failed to delete FAQ");
//                                 return;
//                             }
//                             toast.success("FAQ has been successfully deleted!");


//                             setDataTable2((prevData) =>
//                                 prevData.filter((faq) => faq._id !== deletedFAQ._id)
//                             );

//                             setIsDeleteModalOpen(false);
//                         }}
//                     />
//                 </div>
//             )}



//             <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
//                 <table className="w-full">
//                     <thead>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <tr key={headerGroup.id} className="!border-px !border-gray-400">
//                                 {headerGroup.headers.map((header) => (
//                                     <th
//                                         key={header.id}
//                                         colSpan={header.colSpan}
//                                         onClick={header.column.getToggleSortingHandler()}
//                                         className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start"
//                                     >
//                                         <div className="items-center justify-between text-xs text-gray-200">
//                                             {flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                         </div>
//                                     </th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody>
//                         {table.getRowModel().rows.map((row) => (
//                             <tr key={row.id}>
//                                 {row.getVisibleCells().map((cell) => (
//                                     <td
//                                         key={cell.id}
//                                         className="min-w-[150px] border-white/0 py-3 pr-4"
//                                     >
//                                         {flexRender(
//                                             cell.column.columnDef.cell,
//                                             cell.getContext()
//                                         )}
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <Pagination
//                 currentPage={pageTable2}
//                 totalPages={totalPage} // Use totalPage from API
//                 onChange={setPageTable2}
//             />
//         </Card>
//     );
// }

// export default FAQTable;


import React, { useState, useEffect, useMemo } from "react";
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

import { VscNewFile } from "react-icons/vsc";
import AddInfluencerModal from "./InfluencerModal";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import FAQUpdate from "./FAQUpdate";
import DeleteFAQ from "./DeleteFAQ";

const columnHelper = createColumnHelper();

function FAQTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pageTable2, setPageTable2] = useState(1); // Current page
    const [dataTable2, setDataTable2] = useState([]); // Data from API
    const [resultsPerPage, setResultsPerPage] = useState(10); // Items per page
    const [totalPage, setTotalPage] = useState(0); // Total pages from API
    const [totalRecord, setTotalRecord] = useState(0); // Total records from API
    const [editingFAQ, setEditingFAQ] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetch data from API
    const fetchData = async () => {
        const loadingToast = toast.loading("Fetching FAQ details...");
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("Authentication required");
                return;
            }
    
            const response = await axios.get(
                `https://capital-curve-apis.onrender.com/api/faq/get-all-faq?page=${pageTable2}&limit=${resultsPerPage}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );
    
            if (response.data?.result?.FAQ?.length > 0) {
                toast.dismiss(loadingToast);
                setDataTable2(response.data.result.FAQ);
                setTotalPage(response.data.result.totalPage || 0);
                setTotalRecord(response.data.result.totalRecord || 0);
                toast.success("FAQs loaded successfully!");
            } else {
                toast.error("No FAQs found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to load FAQs.");
        } finally {
            toast.dismiss(loadingToast);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, [pageTable2, resultsPerPage]);

    const handleViewClick = (row) => {
        setEditingFAQ(row.original);
    };

    const handleDeleteClick = (row) => {
        setIsDeleteModalOpen(true);
        setEditingFAQ(row.original);
    };

    // Handle search query (client-side filtering)
    const filteredData = useMemo(() => {
        if (!searchQuery) return dataTable2; // Return all data if no search query
        return dataTable2.filter((item) =>
            ["_id", "question", "answer", "status", "updatedAt"].some((key) =>
                item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, dataTable2]);

    // Pagination component
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

    // Table columns
    const columns = [
        columnHelper.accessor("_id", {
            id: "_id",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Sr No</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center"><span className="text-blueSecondary dark:text-brand-400"> {info.row.index + 1}</span></p>,
        }),
        columnHelper.accessor("question", {
            id: "question",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Question</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">{info.getValue()}</p>,
        }),
        columnHelper.accessor("answer", {
            id: "answer",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Answer</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">{info.getValue()}</p>,
        }),
        columnHelper.accessor("status", {
            id: "status",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status</p>,
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
        columnHelper.accessor("updatedAt", {
            id: "updatedAt",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Date</p>,
            cell: (info) => {
                const date = new Date(info.getValue());
                const formattedDate = date.toLocaleDateString();
                return <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">{formattedDate}</p>;
            },
        }),
        columnHelper.display({
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
                        <FaEdit className="text-green-300 text-lg" />
                    </button>
                    <button aria-label="Delete" onClick={() => handleDeleteClick(info.row)}>
                        <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
                    </button>
                </div>
            ),
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
        <Card extra={"w-full sm:overflow-auto px-6 scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white mt-4"}>
            <Toaster />
            <header className="relative flex flex-col md:flex-row items-center justify-between pt-4 gap-4 md:gap-0">
                <div className="text-xl font-bold text-navy-700 dark:text-white">Question & Answer</div>
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

            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <AddInfluencerModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={async (newData) => {
                            if (!newData) {
                                toast.error("Invalid data!");
                                return;
                            }
                            toast.success("Data has been successfully added!");
                            await fetchData(); // Refetch data after adding
                        }}
                    />
                </div>
            )} */}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <FAQUpdate
                        isOpen={isEditModalOpen}
                        faq={editingFAQ}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmit={async (updatedData) => {
                            if (!updatedData) {
                                toast.error("Invalid data!");
                                return;
                            }
                            toast.success("FAQ has been successfully updated!");
                            await fetchData(); 
                        }}
                    />
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <AddInfluencerModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={async (newData) => {
                            if (!newData) {
                                toast.error("Invalid data!");
                                return;
                            }
                            toast.success("Data has been successfully added!");

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
                    <DeleteFAQ
                        isOpen={isDeleteModalOpen}
                        faq={editingFAQ}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={async (deletedFAQ) => {
                            if (!deletedFAQ) {
                                toast.error("Failed to delete FAQ");
                                return;
                            }
                            toast.success("FAQ has been successfully deleted!");
                            await fetchData(); // Refetch data after deleting
                        }}
                    />
                </div>
            )}

            <div className="mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
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

            <Pagination
                currentPage={pageTable2}
                totalPages={totalPage}
                onChange={setPageTable2}
            />
        </Card>
    );
}

export default FAQTable;