import axios from "axios";
import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { BsCloudCheck } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://capital-curve-apis.onrender.com/api/admin/admin-logout", {},)
      if (response.status === 200) {
        toast.success("Logged out successfully", { duration: 3000 });
        console.log(response)
        localStorage.removeItem("token");
        setTimeout(() => navigate("/auth/sign-in"), 2000);
      }
      else {
        toast.error("Couldn't log out", { duration: 3000 });
      }

    }
    catch (error) {
      toast.error("an error occurred during Logout", error)
    }
  };

  return (
    <Card extra={"w-full h-full p-4"}>

      <div className="ml-auto">
        {/* <CardMenu /> */}
      </div>

      {/* Your storage */}
      <div className="mb-auto flex flex-col items-center justify-center">
        <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary dark:text-brand-400 p-[26px] text-5xl font-bold text-brand-500 dark:!bg-navy-700">
          <VscSignOut />
        </div>
        <h4 className="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white">
          Ready to Leave?
        </h4>
        <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
          You’re about to log out. Come back soon!
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col">
        <div className="mt-4 flex gap-4">
          <button className="w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Stay
          </button>
          <button
            className="w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <Toaster />
    </Card>
  );
};

export default Logout;
