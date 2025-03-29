import React, { useState, useEffect, useMemo } from "react";
import Card from "components/card";
import dummyData from "../variable/ProblamDummy";
import { MdOutlineDeleteOutline, MdBlock } from "react-icons/md";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";
import { FaEdit, FaEye } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import ProblamAddluencerModal from "./ProblamAdd";
import {toast, Toaster} from "react-hot-toast"


const columnHelper = createColumnHelper();
const response2 = dummyData.concat([]);

function UserProblam() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sorting, setSorting] = useState([{ id: "userID", desc: false }]);
    const [pageTable2, setPageTable2] = useState(1);
    const [dataTable2, setDataTable2] = useState([]);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const filteredData = useMemo(() => {
        return response2.filter((item) =>
            ["Id", "Description", "ProblamType", "Status"].some((key) =>
                item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

    const totalResults = filteredData.length;

    useEffect(() => {
        // Filter the data first, then slice based on pagination
        const filtered = filteredData.slice(
            (pageTable2 - 1) * resultsPerPage,
            pageTable2 * resultsPerPage
        );
        setDataTable2(filtered);
    }, [pageTable2, resultsPerPage, filteredData]);

    function Pagination({ currentPage, totalResults, resultsPerPage, onChange }) {
        const totalPages = Math.ceil(totalResults / resultsPerPage);
        return (
            <div className="flex justify-between mt-4 py-5 items-center">
                <Toaster/>

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
                            setPageTable2(1); // Reset to the first page
                            setResultsPerPage(Number(e.target.value));
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
        columnHelper.accessor("Id", {
            id: "Id",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">ID</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center"><span className="text-blueSecondary dark:text-brand-400">#{info.getValue()}</span></p>,
        }),
        columnHelper.accessor("ProblamType", {
            id: "ProblamType",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Problam Type</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">{info.getValue()}</p>,
        }),
        columnHelper.accessor("TotalProblam", {
            id: "TotalProblam",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Total Problam</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center">{info.getValue()}</p>,
        }),

        columnHelper.accessor("Status", {
            id: "Status",
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
        columnHelper.accessor("created_at", {
            id: "created_at",
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
            cell: () => (
                <div className="flex justify-center items-center gap-4">
                    <button aria-label="Block">
                        <FaEdit className="text-green-300 text-lg" />
                    </button>

                    <button aria-label="Delete">
                        <MdOutlineDeleteOutline className="text-blue-400 text-lg" />
                    </button>
                    <button aria-label="View">
                        <FaEye className="text-yellow-500 text-lg" />
                    </button>
                </div>
            ),
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
        <Card extra={"w-full sm:overflow-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white px-6 mt-4"}>
           
            <header className="relative flex flex-col md:flex-row items-center justify-between pt-4 gap-4 md:gap-0">
                <div className="text-xl font-bold text-navy-700 dark:text-white">Types of Problem</div>


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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <ProblamAddluencerModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={(newData) => {
                            if (!newData) {
                                toast.error("Please select a new Problem")
                            }
                            else {
                                toast.success("Problem added successfully")
                            }
                            setDataTable2((prevData) => [...prevData, newData]);
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


            <Pagination
                className="m-12"
                currentPage={pageTable2}
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={setPageTable2}
            />
        </Card>
    );
}

export default UserProblam;
