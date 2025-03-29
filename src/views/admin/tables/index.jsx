// import React, { useState, useEffect } from 'react';
// import response from './variables/tableData';

// const response2 = response.concat([]);

// function Tables() {
  // const [pageTable2, setPageTable2] = useState(1);
  // const [dataTable2, setDataTable2] = useState([]);
  // const [resultsPerPage, setResultsPerPage] = useState(10);
  // const totalResults = response.length;

  // useEffect(() => {
  //   setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  // }, [pageTable2, resultsPerPage]);

  // function Pagination({ currentPage, totalResults, resultsPerPage, onChange }) {
  //   const totalPages = Math.ceil(totalResults / resultsPerPage);
  //   return (
  //     <div className="flex justify-between mt-4 items-center">
  //       <div>
  //         <label htmlFor="pageLimit" className="mr-2 text-sm font-medium text-gray-700">
  //           Rows per page:
  //         </label>
  //         <select
  //           id="pageLimit"
  //           className="px-2 py-1 text-sm border rounded"
  //           value={resultsPerPage}
  //           onChange={(e) => {
  //             setPageTable2(1); // Reset to the first page
  //             setResultsPerPage(Number(e.target.value));
  //           }}
  //         >
  //           <option value={5}>5</option>
  //           <option value={10}>10</option>
  //           <option value={20}>20</option>
  //         </select>
  //       </div>
  //       <div>
  //         {[...Array(totalPages)].map((_, index) => (
  //           <button
  //             key={index}
  //             className={`px-3 py-1 mx-1 text-sm border rounded ${
  //               index + 1 === currentPage ? 'bg-blue-700 text-white' : 'bg-white text-blue-500 border-blue-500'
  //             }`}
  //             onClick={() => onChange(index + 1)}
  //           >
  //             {index + 1}
  //           </button>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

//   return (
//     <>
//       <div className="mb-8 mt-4">
//         <table className="min-w-full border text-sm font-bold text-navy-700 dark:text-white">
//           <thead>
//             <tr className="font-bold text-navy-700 dark:text-white">
//               <th className="px-4 py-2 border">Client</th>
//               <th className="px-4 py-2 border">Amount</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataTable2.map((user, i) => (
//               <tr key={i} className="text-sm">
//                 <td className="px-4 py-2 border">
//                   <div className="flex items-center">
//                     <img
//                       className="w-10 h-10 rounded-full mr-3"
//                       src={user.avatar}
//                       alt="User avatar"
//                     />
//                     <div>
//                       <p className="font-semibold">{user.name}</p>
//                       <p className="text-xs text-gray-600">{user.job}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-2 border">$ {user.amount}</td>
//                 <td className="px-4 py-2 border">
//                   <span className={`px-2 py-1 rounded ${user.status === 'active' ? 'bg-green-200' : 'bg-red-200'}`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border">{new Date(user.date).toLocaleDateString()}</td>
//                 <td className="px-4 py-2 border">
//                   <button className="px-2 py-1 text-blue-500 hover:text-blue-700">Edit</button>
//                   <button className="px-2 py-1 text-red-500 hover:text-red-700">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
      //   <Pagination
      //     currentPage={pageTable2}
      //     totalResults={totalResults}
      //     resultsPerPage={resultsPerPage}
      //     onChange={setPageTable2}
      //   />
      // </div>
//     </>
//   );
// }

// export default Tables;
import CheckTable from "./components/CheckTable";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DevelopmentTable
          // columnsData={columnsDataDevelopment}
          // tableData={tableDataDevelopment}
        />
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
      </div>

      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div> */}
    </div>
  );
};

export default Tables;
