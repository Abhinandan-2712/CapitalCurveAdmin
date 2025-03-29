import Banner from "./components/Banner";
import Logout from "./components/Logout";
const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-7 lg:!mb-0">
          <Banner />
        </div>
        <div className=" col-span-5 lg:!mb-0">
          <Logout />
        </div>
      </div>
     

    
    </div>
  );
};

export default ProfileOverview;
