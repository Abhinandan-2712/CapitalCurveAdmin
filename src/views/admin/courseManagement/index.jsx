
import DevelopmentTable from "./components/CourseTable"
import { MdBarChart, MdDashboard } from "react-icons/md";
import { FaVideoSlash,FaVideo } from "react-icons/fa";
import Widget from "components/widget/Widget";
import Upload from "./components/Upload";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";


const Dashboard = () => {

  const [totalVideo, setTotalVideo] = useState("");
  const [activeVideo, setActiveVideo] = useState("");
  const [inactiveVideo, setInactiveCollege] = useState("");
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
        "https://capital-curve-apis.onrender.com/api/admin/get-video-data",
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data?.result) {
        setTotalVideo(response.data.result.totalVideo);
        setActiveVideo(response.data.result.activeVideo);
        setInactiveCollege(response.data.result.inactiveVideo);
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
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total video"}
          subtitle={totalVideo?? "loading..."}
        />
        <Widget
          icon={<FaVideoSlash className="h-6 w-6" />}
          title={"Inactive Video  "}
          subtitle={inactiveVideo?? "loading..."}
        />
       
        <Widget
          icon={<FaVideo className="h-6 w-6" />}
          title={"Active Video"}
          subtitle={activeVideo?? "loading.."}
        />
      </div>

      {/* Charts */}
      <div className="w-full mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-7 lg:!mb-0">
          <DevelopmentTable onRefresh={handleRefresh}/>

        </div>

       

        <div className="h-fit col-span-5 lg:!mb-0 ">
          <Upload onRefresh={handleRefresh}/>
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
