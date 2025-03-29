import { useState } from "react";
import Card from "components/card";

import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import AddOns from "./components/Addons";
import UserList from "./components/UserList";

const Index = ({ addsOn = [], User = [] }) => {
  const [currentTab, setCurrentTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="">
      <div className="">
        <div>
          <div className="flex flex-col gap-5">
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1 " >
              <button
                className={`${currentTab === "tab1"
                  ? "w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  : "text-navy-900 dark:text-white border border-brand-700 dark:border-brand-200 rounded-xl"
                  }`}
                onClick={() => handleTabChange("tab1")}>
                Add-Ons
              </button>
              {/* <button
                className={`${currentTab === "tab2"
                  ? "w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  : "text-navy-900 dark:text-white border border-brand-700 dark:border-brand-200 rounded-xl"
                  }`}
                onClick={() => handleTabChange("tab2")} >
                User List
              </button> */}
            </div>

            <Card className="">
              {/* {currentTab === "tab1" && (
                <div>
                  {addsOn.length === 0 ? (
                    <p>No Add-Ons data available.</p>
                  ) : ( */}
                    <AddOns />
                  {/* )}
                </div>
              )} */}

              {/* {currentTab === "tab2" && (
                <div >
                  {User.length === 0 ? (
                    <p>No users to display yet.</p>
                  ) : (
                    <UserList User={User} />
                  )}
                </div>
              )} */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
