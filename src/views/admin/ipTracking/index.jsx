import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import IPTracking from "./components/IpTracking";

const Dashboard = () => {
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Users"}
          subtitle={"12987"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Active Users"}
          subtitle={"3456"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Inactive Users"}
          subtitle={"5746"}
        />
        {/* <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Total Revenue"}
          subtitle={"$10000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Withdrawals"}
          subtitle={"$145765"}
        /> */}

      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <IPTracking />
      </div>



    </div>
  );
};

export default Dashboard;
