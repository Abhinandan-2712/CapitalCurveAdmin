import React, { useState, useEffect } from "react";
import Progress from "components/progress";
import Card from "components/card";
import dummyData from "../variables/influence"; // Adjust path as needed
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

const columnHelper = createColumnHelper();
const response2 = dummyData.concat([]);

function CollegeTable() {

    const [searchQuery, setSearchQuery] = useState("");
    const [sorting, setSorting] = useState([{ id: "userID", desc: false }]);
    // Pagination state
    const [pageTable2, setPageTable2] = useState(1);
    const [dataTable2, setDataTable2] = useState([]);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const filteredData = response2.filter((item) =>
        ["ID", "Name", "Email", "CollegeCode", "platform"].some((key) =>
            item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    const totalResults = filteredData.length;

    useEffect(() => {
        // Filter the data first, then slice based on pagination
        const filtered = filteredData.slice(
            (pageTable2 - 1) * resultsPerPage,
            pageTable2 * resultsPerPage
        );
        setDataTable2(filtered);
    }, [pageTable2, resultsPerPage, searchQuery]);


    function Pagination({ currentPage, totalResults, resultsPerPage, onChange }) {
        const totalPages = Math.ceil(totalResults / resultsPerPage);
        return (
            <div className="flex justify-between mt-4 py-5 items-center">
                <div>
                    <label
                        htmlFor="pageLimit"
                        className="mr-2 text-sm font-medium text-gray-600  dark:text-white"
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
        columnHelper.accessor("id", {
            id: "id",
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
        columnHelper.accessor("platform", {
            id: "platform",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Platform</p>
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

        columnHelper.accessor("code", {
            id: "code",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Code</p>
            ),
            cell: (info) => (
                <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor("usageCount", {
            id: "usageCount",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Total Users</p>
            ),
            cell: (info) => (
                <p className="text-md font-medium text-gray-600 dark:text-white flex justify-center items-center">
                    {info.getValue()}
                </p>
            ),
        }),

        // columnHelper.accessor("Status", {
        //     id: "Status",
        //     header: () => (
        //         <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status </p>
        //     ),
        //     cell: (info) => {
        //         const statusColor =
        //             info.getValue() === "Active"
        //                 ? "bg-green-200"
        //                 : info.getValue() === "Inactive"
        //                     ? "bg-red-200"
        //                     : "text-gray-500 bg-blue-200";
        //         return (
        //             <div className="flex justify-center items-center">

        //                 <p className={`text-sm font-bold w-16 dark:text-navy-700 text-gray-700 rounded-md flex justify-center items-center ${statusColor}`}>
        //                     {info.getValue()}
        //                 </p>
        //             </div>
        //         );
        //     },
        // }),

        

        // columnHelper.accessor("Usages", {
        //     id: "Usages",
        //     header: () => (
        //         <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">
        //             Used Limit
        //         </p>
        //     ),
        //     cell: (info) => {
        //         const value = info.getValue();

        //         return (
        //             <div className="mx-2 flex font-bold flex justify-center items-center">
        //                 {value === 0 && (
        //                     <p className="text-md font-medium text-gray-600 dark:text-white">
        //                         {"0"}
        //                     </p>
        //                 )}
        //                 {value > 0 && value <= 20 && (
        //                     <p className="text-md font-medium text-red-400 ">
        //                         {value}%
        //                     </p>
        //                 )}
        //                 {value > 20 && value <= 50 && (
        //                     <>
        //                         <p className="text-md font-medium text-yellow-500 dark:text-yellow-500">
        //                             {value}%
        //                         </p>
        //                     </>
        //                 )}
        //                 {value > 50 && value <= 80 && (
        //                     <>
        //                         <p className="text-md font-medium text-green-400 dark:text-green-300">
        //                             {value}%
        //                         </p>
        //                     </>
        //                 )}
        //                 {value > 80 && value <= 100 && (
        //                     <>
        //                         <p className="text-md font-medium text-blue-400 ">
        //                             {value}%
        //                         </p>
        //                     </>
        //                 )}
        //             </div>
        //         );
        //     },
        // }),
        columnHelper.accessor("Status", {
            id: "Status",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Status</p>
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
        columnHelper.accessor("total_commission", {
            id: "total_commission",
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
        data: dataTable2, // Use the paginated data
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
        <Card extra={"w-full sm:overflow-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white px-6 mt-4"}>
            <header className="relative flex items-center justify-between pt-4">
                <div Codes className="text-xl font-bold text-navy-700 dark:text-white">
                Influence
                </div>

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

            {/* Pagination Controls */}
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

export default CollegeTable;
