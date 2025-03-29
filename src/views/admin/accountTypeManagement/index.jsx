import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import { useState } from "react";
import Card from "components/card";
import {
  createColumnHelper,
  flexRender
} from "@tanstack/react-table";
import { FaEdit, FaEye } from "react-icons/fa";
import AccountSizeTable from "./components/EquityTable";
import DerivativesTable from "./components/DerivativesTable";
const columnHelper = createColumnHelper();
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";



const Dashboard = () => {
 

 

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">ID</p>,
      cell: (info) => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center"><span className="text-blueSecondary dark:text-brand-400">#{info.getValue()}</span></p>,
    }),
    columnHelper.accessor("Price", {
      id: "Price",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white flex justify-center items-center">Price</p>,
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
          <button aria-label="View">
            <FaEye className="text-yellow-500 text-lg" />
          </button>
        </div>
      ),
    }),
  ];

  const [currentTab, setCurrentTab] = useState("tab1");
  const [subTab, setSubTab] = useState("subTab1");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSubTab("subTab1"); // Reset subTab when switching main tabs
  };

  const handleSubTabChange = (tab) => {
    setSubTab(tab);
  };

  const renderTable = () => (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="border border-gray-200 px-4 py-2">Sr. No</th>
          <th className="border border-gray-200 px-4 py-2">Name</th>
          <th className="border border-gray-200 px-4 py-2">Details</th>
          <th className="border border-gray-200 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map((num, index) => (
          <tr key={index}>
            <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-200 px-4 py-2">Name {index + 1}</td>
            <td className="border border-gray-200 px-4 py-2">Details {index + 1}</td>
            <td className="border border-gray-200 px-4 py-2">
              <button className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">Edit</button>
              <button className="ml-2 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Earnings"
          subtitle="$340.5"
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title="Spend this month"
          subtitle="$642.39"
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Sales"
          subtitle="$574.34"
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title="Your Balance"
          subtitle="$1,000"
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="New Tasks"
          subtitle="145"
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title="Total Projects"
          subtitle="$2433"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-2">
        <button
          className={`${currentTab === "tab1"
              ? "w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              : "text-navy-900 dark:text-white border border-brand-700 dark:border-brand-200 rounded-xl"
            }`}
          onClick={() => handleTabChange("tab1")}
        >
          Equity
        </button>
        <button
          className={`${currentTab === "tab2"
              ? "w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              : "text-navy-900 dark:text-white border border-brand-700 dark:border-brand-200 rounded-xl"
            }`}
          onClick={() => handleTabChange("tab2")}
        >
          Derivatives
        </button>
      </div>

    
      <div className="mt-5">
        {currentTab === "tab1" && (
          <div className="flex flex-col gap-5">
            <AccountSizeTable />
          </div>
        )}

        {currentTab === "tab2" && (
          <div className="flex flex-col gap-5">
            <DerivativesTable/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
