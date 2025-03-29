import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import CollegeTable from "./components/CollegeTable";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const [totalCollege, setTotalCollege] = useState("");
  const [totalActiveCollege, setTotalActiveCollege] = useState("");
  const [totalInactiveCollege, setTotalInactiveCollege] = useState("");
  const [refresh, setRefresh] = useState(false); // Refresh state

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
        "https://capital-curve-apis.onrender.com/api/college-type/get-college-data",
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data?.result) {
        setTotalCollege(response.data.result.totalCollege);
        setTotalActiveCollege(response.data.result.totalActiveCollege);
        setTotalInactiveCollege(response.data.result.totalInactiveCollege);
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

  // Fetch data when refresh state changes
  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Function to trigger refresh
  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div>
      <Toaster />
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total College"}
          subtitle={totalCollege ?? "Loading..."}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Active College"}
          subtitle={totalActiveCollege ?? "Loading..."}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Inactive College"}
          subtitle={totalInactiveCollege ?? "Loading..."}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Pending College"}
          subtitle={"$1,000"}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <CollegeTable onRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default Dashboard;
