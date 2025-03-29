import { useState, useCallback, useEffect } from "react";
import Card from "components/card";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { VscNewFile } from "react-icons/vsc";
// import AddAddons from "./AddAddons";
import StagesDelete from "./StagesDelete";
import StagesEdit from "./StagesEdit";
import { toast, Toaster } from "react-hot-toast";
import { MdBlock } from "react-icons/md";
import axios from "axios";

const columnHelper = createColumnHelper();

const StagesTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingAccT, setEditingAccT] = useState(null);



    // Fetch Data from API
    // const fetchData = useCallback(async () => {
    //   const loadingToast = toast.loading("Updating Add-Ons...");
    //   try {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //       toast.dismiss(loadingToast);
    //       toast.error("Please login to access the data.");
    //       return;
    //     }

    //     const response = await axios.get("https://capital-curve-apis.onrender.com/api/addons/get-all-addons", {
    //       headers: {
    //         "Content-Type": "application/json",
    //         token: token,
    //       },
    //     });

    //     if (response.data?.result) {
    //       setData(response.data.result.addons || []);
    //     } else {
    //       toast.error("No Data Found");
    //     }
    //   } catch (error) {
    //     toast.error("Failed to fetch data.");
    //     console.error("Failed to fetch data:", error);
    //   } finally {
    //     toast.dismiss(loadingToast);
    //   }
    // }, []);
    const fetchData = useCallback(async () => {
        const loadingToast = toast.loading("Updating Add-Ons...");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("Please login to access the data.");
                return;
            }

            const response = await axios.get("https://capital-curve-apis.onrender.com/api/stages/get-all-stage", {
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            });
            // console.log(response);

            const addonsData = response.data?.result?.allstages ?? [];

            if (addonsData.length > 0) {
                setData(addonsData);
            } else {
                toast.error("No Add-Ons Found");
            }
        } catch (error) {
            toast.error("Failed to fetch data.");
            console.error("Failed to fetch data:", error);
        } finally {
            toast.dismiss(loadingToast);
        }
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const columns = [
        columnHelper.accessor("id", {
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Step</p>,
            cell: (info) => <p className="text-sm font-bold text-blueSecondary dark:text-brand-400 text-center">{info.row.index + 1}</p>,
        }),
        columnHelper.accessor("profitTarget", {
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Profit Target</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">{info.getValue()}</p>,
        }),
        columnHelper.accessor("profitMaintainedDays", {
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white text-center">
                    Profit Maintained Days
                </p>
            ),
            cell: (info) => (
                <div className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center text-center  ">
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor("overallLossLimit", {
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Overall Loss Limit</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">{info.getValue()}</p>,
        }),
        columnHelper.accessor("dailyLossLimit", {
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Daily Loss Limit</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">{info.getValue()}</p>,
        }),
        columnHelper.accessor("totalTradingDays", {
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Total Trading Days</p>,
            cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">{info.getValue()}</p>,
        }),

        columnHelper.accessor("status", {
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Status</p>,
            cell: (info) => {
                const statusColor = info.getValue() === "Active" ? "bg-green-200" : "bg-red-200";
                return (
                    <div className="flex justify-center items-center">
                        <p className={`text-sm font-bold w-16 text-gray-700 dark:text-navy-700 rounded-md text-center ${statusColor}`}>
                            {info.getValue()}
                        </p>
                    </div>
                );
            },
        }),
        columnHelper.display({
            id: "Action",
            header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">Action</p>,
            cell: (info) => (
                <div className="flex justify-center items-center gap-4">
                    <button aria-label="Edit" onClick={() => { setEditingAccT(info.row.original); setIsEditModalOpen(true); }}><FaEdit className="text-green-300 text-lg" /></button>
                    {/* <button aria-label="Delete"><FaEye className="text-yellow-500 text-lg" /></button> */}
                    {/* <button aria-label="Delete" onClick={() => { setIsDeleteModalOpen(true); setEditingAccT(info.row.original) }}><MdOutlineDeleteOutline className="text-red-400 text-lg" /></button> */}
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
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <Card extra={"w-full sm:overflow-auto px-6 scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white mt-4"}>
            <Toaster />
            <header className="flex flex-col items-center justify-between gap-4 pt-4 md:flex-row">
                <div className="text-xl font-bold text-navy-700 dark:text-white">Stages</div>
                {/* <button
                    className="flex items-center gap-2 rounded-md bg-blueSecondary p-2 text-white hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-brand-500"
                    onClick={() => setIsModalOpen(true)}
                >
                    <VscNewFile /> Add new
                </button> */}
            </header>
{/*    */}
      {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                  <StagesEdit
                    isOpen={isEditModalOpen}
                    Stages={editingAccT}
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
              {/* {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                  <StagesDelete
                    isOpen={isDeleteModalOpen}
                    Addons={editingAccT}
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
              )} */}
      

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
        </Card>
    );
};

export default StagesTable;
