// /* eslint-disable */
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import DashIcon from "components/icons/DashIcon";
// // chakra imports

// export function SidebarLinks(props) {
//   // Chakra color mode
//   let location = useLocation();

//   const { routes } = props;

//   // verifies if routeName is the one active (in browser input)
//   const activeRoute = (routeName) => {
//     return location.pathname.includes(routeName);
//   };

//   const createLinks = (routes) => {
//     return routes.map((route, index) => {
//       if (
//         route.layout === "/admin" ||
//         route.layout === "/auth" ||
//         route.layout === "/rtl"
//       ) {
//         return (
//           <Link key={index} to={route.layout + "/" + route.path}>
//             <div className="relative mb-3 flex hover:cursor-pointer">
//               <li
//                 className="my-[3px] flex cursor-pointer items-center px-8"
//                 key={index}
//               >
//                 <span
//                   className={`${
//                     activeRoute(route.path) === true
//                       ? "font-bold text-brand-500 dark:text-white"
//                       : "font-medium text-gray-600"
//                   }`}
//                 >
//                   {route.icon ? route.icon : <DashIcon />}{" "}
//                 </span>
//                 <p
//                   className={`leading-1 ml-4 flex ${
//                     activeRoute(route.path) === true
//                       ? "font-bold text-navy-700 dark:text-white"
//                       : "font-medium text-gray-600"
//                   }`}
//                 >
//                   {route.name}
//                 </p>
//               </li>
//               {activeRoute(route.path) ? (
//                 <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
//               ) : null}
//             </div>
//           </Link>
//         );
//       }
//     });
//   };
//   // BRAND
//   return createLinks(routes);
// }

// export default SidebarLinks;


/* eslint-disable */
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { HiChevronDown, HiChevronUp } from "react-icons/hi";
// import DashIcon from "components/icons/DashIcon";

// export function SidebarLinks({ routes }) {
//   let location = useLocation();
//   const [expanded, setExpanded] = useState({});

//   const activeRoute = (routeName) => {
//     return location.pathname.includes(routeName);
//   };

//   const toggleExpand = (index) => {
//     setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   const createLinks = (routes) => {
//     return routes.map((route, index) => (
//       <div key={index}>
//         <Link to={route.layout + "/" + route.path}>
//           <div className="relative mb-3 flex items-center hover:cursor-pointer ">
//             <li
//               className={`my-[3px] flex cursor-pointer items-center px-8 ${
//                 activeRoute(route.path)
//                   ? "font-bold text-brand-500 dark:text-white"
//                   : "font-medium text-gray-600"
//               }`}
//             >
//               <span>{route.icon ? route.icon : <DashIcon />}</span>
//               <p className="leading-1 ml-4">{route.name}
                
//               </p>
//             </li>
//             {activeRoute(route.path) && (
//               <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
//             )}
//           </div>
//         </Link>

//         {route.children && (
//             <span>
//               {expanded[index] ? (
//                 <HiChevronUp className="text-gray-600 dark:text-gray-300" />
//               ) : (
//                 <HiChevronDown className="text-gray-600 dark:text-gray-300" />
//               )}
//             </span>
//           )}

//         {/* Sub-Routes */}
//         {route.children && expanded[index] && (
//           <div className="ml-8 space-y-2">
//             {route.children.map((subRoute, subIndex) => (
//               <Link
//                 key={subIndex}
//                 to={subRoute.layout + "/" + subRoute.path}
//                 className={`block py-1 text-sm ${
//                   activeRoute(subRoute.path)
//                     ? "text-brand-500 font-semibold"
//                     : "text-gray-500 hover:text-brand-500"
//                 }`}
//               >
//                 {subRoute.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   return <ul className="space-y-2">{createLinks(routes)}</ul>;
// }

// export default SidebarLinks;
/* eslint-disable */
/* eslint-disable */















import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import DashIcon from "components/icons/DashIcon";

export function SidebarLinks({ routes }) {
  let location = useLocation();
  const [expanded, setExpanded] = useState({});

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };


  // changes after conneted with login api

  
  // const createLinks = (routes) => {
  //   return routes.map((route, index) => (
  //     <div key={index}>
  //       {/* Top-level route */}
  //       <div
  //         className="relative mb-3 flex items-center justify-between px-8 hover:cursor-pointer"
  //         onClick={() => (route.children ? toggleExpand(index) : null)}
  //       >
  //         <Link
  //           to={!route.children ? route.layout + "/" + route.path : "#"}
  //           className="flex items-center"
  //         >
  //           <li
  //             className={`my-[3px] flex cursor-pointer items-center ${
  //               activeRoute(route.path)
  //                 ? "font-bold text-brand-500 dark:text-brand-400"
  //                 : "font-medium text-gray-600"
  //             }`}
  //           >
  //             <span>{route.icon ? route.icon : <DashIcon />}</span>
  //             <p className="leading-1 ml-4">{route.name}</p>
  //           </li>
  //         </Link>
  //         {route.children && (
  //           <span>
  //             {expanded[index] ? (
  //               <HiChevronUp className="text-gray-600 dark:text-gray-300" />
  //             ) : (
  //               <HiChevronDown className="text-gray-600 dark:text-gray-300" />
  //             )}
  //           </span>
  //         )}
  //       </div>

  //       {/* Sub-routes */}
  //       {route.children && expanded[index] && (
  //         <div className="ml-[72px] space-y-2">
  //           {route.children.map((subRoute, subIndex) => (
  //             <Link
  //               key={subIndex}
  //               to={route.path + "/" + subRoute.paths}
  //               className={`my-[3px] flex cursor-pointer items-center ${
  //                 activeRoute(subRoute.paths)
  //                   ? "font-bold text-brand-500 dark:text-brand-400"
  //                   : "font-medium text-gray-600"
  //               }`}
  //             >
  //                <span>{subRoute.icon ? subRoute.icon : <DashIcon />}</span>
  //               <p className="leading-1 ml-4">{subRoute.name}</p>
  //             </Link>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   ));
  // };

  const createLinks = (routes) => {
    return routes
      .filter((route) => !route.hidden)
      .map((route, index) => (
        <div key={index}>
          <div
            className="relative mb-3 flex items-center justify-between px-8 hover:cursor-pointer"
            onClick={() => (route.children ? toggleExpand(index) : null)}
          >
            <Link
              to={!route.children ? route.layout + "/" + route.path : "#"}
              className="flex items-center"
            >
              <li
                className={`my-[3px] flex cursor-pointer items-center ${
                  activeRoute(route.path)
                    ? "font-bold text-brand-500 dark:text-brand-400"
                    : "font-medium text-gray-600"
                }`}
              >
                <span>{route.icon ? route.icon : <DashIcon />}</span>
                <p className="leading-1 ml-4">{route.name}</p>
              </li>
            </Link>
            {route.children && (
              <span>
                {expanded[index] ? (
                  <HiChevronUp className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <HiChevronDown className="text-gray-600 dark:text-gray-300" />
                )}
              </span>
            )}
          </div>
  
          {/* Sub-routes */}
          {route.children && expanded[index] && (
            <div className="ml-[72px] space-y-2">
              {route.children
                .filter((subRoute) => !subRoute.hidden) // ✅ Hide hidden sub-routes
                .map((subRoute, subIndex) => (
                  <Link
                    key={subIndex}
                    to={route.path + "/" + subRoute.paths}
                    className={`my-[3px] flex cursor-pointer items-center ${
                      activeRoute(subRoute.paths)
                        ? "font-bold text-brand-500 dark:text-brand-400"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    <span>{subRoute.icon ? subRoute.icon : <DashIcon />}</span>
                    <p className="leading-1 ml-4">{subRoute.name}</p>
                  </Link>
                ))}
            </div>
          )}
        </div>
      ));
  };
  


  return <ul className="space-y-2">{createLinks(routes)}</ul>;
}

export default SidebarLinks;
