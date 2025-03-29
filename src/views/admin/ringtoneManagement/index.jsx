import RingtoneTable from "./components/RingtoneTable";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import Upload from "./components/Upload";
import { IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";
import { useState, useEffect } from "react"
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";


const Dashboard = () => {


  const [totalRingtone, setTotalRingtone] = useState("");
  const [activeRingtone, setActiveRingtone] = useState("");
  const [inactiveRingtone, setInactiveRingtone] = useState("");
  const [refresh, setRefresh] = useState(false);  // Refresh state

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
        "https://capital-curve-apis.onrender.com/api/ringtone/get-ringtone-data",
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data?.result) {
        setTotalRingtone(response.data.result.totalRingtone);
        setActiveRingtone(response.data.result.activeRingtone);
        setInactiveRingtone(response.data.result.inactiveRingtone);
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

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total video"}
          subtitle={totalRingtone ?? "loading..."}
        />
        <Widget
          icon={<IoMdVolumeOff className="h-6 w-6" />}
          title={"Inactive Video  "}
          subtitle={inactiveRingtone ?? "loading..."}
        />

        <Widget
          icon={<IoMdVolumeHigh className="h-6 w-6" />}
          title={"Active Video"}
          subtitle={activeRingtone ?? "loading.."}
        />
      </div>

      <div className="mt-3 flex h-fit w-full flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-7 lg:!mb-0">
          <RingtoneTable onRefresh={handleRefresh} />
        </div>
        <div className=" col-span-5 h-fit lg:!mb-0 ">
          <Upload onRefresh={handleRefresh} />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
