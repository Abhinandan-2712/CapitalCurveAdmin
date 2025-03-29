// import MiniCalendar from "components/calendar/MiniCalendar";
// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import TotalSpent from "views/admin/default/components/TotalSpent";
// import PieChartCard from "views/admin/default/components/PieChartCard";
// import { IoMdHome } from "react-icons/io";
// import { IoDocuments } from "react-icons/io5";
// import { MdBarChart, MdDashboard } from "react-icons/md";

// import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

// import Widget from "components/widget/Widget";
// import CheckTable from "views/admin/default/components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
// import TaskCard from "views/admin/default/components/TaskCard";
// import tableDataCheck from "./variables/tableDataCheck.json";
// import tableDataComplex from "./variables/tableDataComplex.json";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// const Dashboard = () => {

//   const [totalUser, setTotalUser] = useState(null);
//   const [totalPandingUser, setTotalPandingUser] = useState(null);
//   const [totalApprovedUser, setTotalApprovedUser] = useState(null);

//   // Fetch data from API


//   const fetchData = async () => {
//     const loadingToast = toast.loading("Fetching Dashboard details...");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.dismiss(loadingToast)
//         toast.error("please Login again ")
//         return;

//       }
//       const response = await axios.get(
//         "https://capital-curve-apis.onrender.com/api/admin/get-admin-dashboard",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             token: token
//           },
//         }
//       )
//       if (response.data?.results) {
//         toast.dismiss(loadingToast)
//         setTotalUser(response.data?.results.totalRegisteredUsers);
//         setTotalPandingUser(response.data?.results.pendingUsers);
//         setTotalApprovedUser(response.data?.results.approvedUsers);
//         toast.success("Dashboard details fetched successfully")
//       }
//       else {
//         toast.error("Failed to fetch dashboard details")
//       }

//     }
//     catch (error) {
//       console.error("Error fetching data", error);
//     }
//     finally {
//       toast.dismiss(loadingToast)
//     }
//   }
//   useEffect(() => {
//     fetchData();
//   }, [])
//   return (
//     <div>
//       {/* Card widget */}

//       <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
//         <Widget
//           icon={<MdBarChart className="h-7 w-7" />}
//           title={"Total Registered Users"}
//           subtitle={`${totalUser}`}
//         />
//         <Widget
//           icon={<IoDocuments className="h-6 w-6" />}
//           title={"Pending Users"}
//           subtitle={"3456"}
//         />
//         <Widget
//           icon={<MdBarChart className="h-7 w-7" />}
//           title={"Approved Users"}
//           subtitle={"5746"}
//         />
//         <Widget
//           icon={<MdDashboard className="h-6 w-6" />}
//           title={"Total Revenue"}
//           subtitle={"$10000"}
//         />
//         <Widget
//           icon={<MdBarChart className="h-7 w-7" />}
//           title={"Withdrawals"}
//           subtitle={"$145765"}
//         />
//         {/* <Widget
//           icon={<IoMdHome className="h-6 w-6" />}
//           title={"Total Projects"}
//           subtitle={"$2433"}
//         /> */}
//       </div>

//       {/* Charts */}

//       <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
//         <TotalSpent />
//         <WeeklyRevenue />
//       </div>

//       {/* Tables & Charts */}

//       <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
//         {/* Check Table */}
//         {/* <div>
//           <CheckTable
//             columnsData={columnsDataCheck}
//             tableData={tableDataCheck}
//           />
//         </div> */}

//         {/* Traffic chart & Pie Chart */}

//         <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
//           <DailyTraffic />
//           <PieChartCard />
//         </div>

//         {/* Complex Table , Task & Calendar */}

//         <ComplexTable
//           columnsData={columnsDataComplex}
//           tableData={tableDataComplex}
//         />

//         {/* Task chart & Calendar */}

//         <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
//           <TaskCard />
//           <div className="grid grid-cols-1 rounded-[20px]">
//             <MiniCalendar />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const [totalUser, setTotalUser] = useState("");
  const [totalPendingUser, setTotalPendingUser] = useState("");
  const [totalApprovedUser, setTotalApprovedUser] = useState("");

  // Fetch data from API
  const fetchData = async () => {
    const loadingToast = toast.loading("Fetching Dashboard details...");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("Please login again");
        return;
      }

      const response = await axios.get(
        "https://capital-curve-apis.onrender.com/api/admin/get-admin-dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      console.log(response);
      if (response.data?.result) {
        setTotalUser(response.data?.result?.totalRegisteredUsers);
        setTotalPendingUser(response.data?.result?.pendingUsers);
        setTotalApprovedUser(response.data?.result?.approvedUsers);
        toast.success("Dashboard details fetched successfully");
      } else {
        toast.error("Failed to fetch dashboard details");
      }
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Error fetching dashboard details");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Toaster/>
      {/* Card Widgets */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Total Registered Users"
          subtitle={totalUser ?? "Loading..."}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title="Pending Users"
          subtitle={totalPendingUser ?? "Loading..."}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Approved Users"
          subtitle={totalApprovedUser ?? "Loading..."}
        />
        {/* <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title="Total Revenue"
          subtitle="$10000"
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="Withdrawals"
          subtitle="$145765"
        /> */}
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Traffic chart & Pie Chart */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table */}
        <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />

        {/* Task chart & Calendar */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
