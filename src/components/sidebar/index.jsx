/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";
import Logo from "../../assets/img/auth/Group 1000003507.png"

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-screen flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      {/* Close Button */}
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden h-auto"
        onClick={onClose}
      >
        <HiX className="text-2xl" />
      </span>

      {/* Logo */}
      <div className={`w-full m-auto mt-[30px] flex items-center`}>
        <div className="w-full mx-auto h-auto ">
          <img src={Logo} alt="Capital curve" className=" w-32 m-auto"/>
        </div>
      </div>
      <div className="mt-[10px] mb-4 h-px bg-gray-300 dark:bg-white/30" />

      {/* Nav Items */}
      <ul className="mb-auto pt-1 overflow-y-auto max-h-[calc(100vh-150px)]">
        <Links routes={routes} />
      </ul>
    </div>
  );
};

export default Sidebar;
