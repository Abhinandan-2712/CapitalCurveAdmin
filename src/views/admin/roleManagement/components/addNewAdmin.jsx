
// import React, { useState } from "react";
// import { VscNewFile } from "react-icons/vsc";

// function AddNewAdmin({ onSubmit, onClose, isOpen }) {
//     const [formData, setFormData] = useState({
//         ID: "",
//         "Admin Name": "",
//         "Admin Email": "",
//         "Phone number": "",
//         Status: "Active",
//         permissions: {
//             userManagement: [],
//             roleManagement: [],
//             collegeManagement: [],
//             accountTypeManagement: [],
//             commission: [],
//             RingtoneManagement: [],
//             refferManagement: [],
//             tradingRuleManagement: [],
//             faqManagement: [],
//             logintacking: [],
//             iptrackings: [],
//             userProblamStatistics: [],
//             termsAndConditions: [],
//             privacyPolicy: [],
//             settings: [],
//         },
//     });

//     const permissionsWithOptions = [
//         "userManagement",
//         "roleManagement",
//         "collegeManagement",
//         "accountTypeManagement",
//         "commission",
//         "RingtoneManagement",
//         "refferManagement",
//         "tradingRuleManagement",
//         "faqManagement",
//         "logintacking",
//         "iptrackings",
//         "userProblamStatistics",
//         "termsAndConditions",
//         "privacyPolicy",
//         "settings",
//     ];

//     const settingsOptions = ["Update", "Create", "Delete", "View"];

//     const handleChange = (e) => {
//         const { name, value, checked } = e.target;

//         if (permissionsWithOptions.includes(name)) {
//             setFormData((prev) => ({
//                 ...prev,
//                 permissions: {
//                     ...prev.permissions,
//                     [name]: checked
//                         ? [...prev.permissions[name], value]
//                         : prev.permissions[name].filter((perm) => perm !== value),
//                 },
//             }));
//         } else if (name === "courseManagement") {
//             setFormData((prev) => ({
//                 ...prev,
//                 permissions: {
//                     ...prev.permissions,
//                     courseManagement: checked,
//                 },
//             }));
//         } else {
//             setFormData((prev) => ({
//                 ...prev,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="flex justify-center ">

//             <div className=" bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 overflow-y-scroll scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
//                 <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4 ">Add New Admin</h2>
//                 <form onSubmit={handleSubmit}

//                 >
//                     <div className="grid xl:grid-cols-4 gap-4">
//                         {Object.entries(formData)
//                             .filter(([key]) => key !== "permissions")
//                             .map(([key, value]) => (
//                                 <div key={key}>
//                                     <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                                         {key}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name={key}
//                                         value={value}
//                                         onChange={handleChange}
//                                         className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
//                                         required
//                                     />
//                                 </div>
//                             ))}

//                     </div>


//                     {/* Permissions Section */}
//                     <div >
//                         <label className="block text-lg font-medium text-gray-700 dark:text-white mb-2">
//                             Permissions
//                         </label>

//                         {/* Dynamic Permission Categories */}
//                         <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-autoscrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white">
//                             {permissionsWithOptions.map((category) => (
//                                 <div key={category} className=" border p-3 rounded-md bg-lightPrimary dark:bg-navy-800  ">
//                                     <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
//                                         {category.replace(/([A-Z])/g, " $1").trim()}
//                                     </label>
//                                     <div className="grid  gap-4">
//                                         {settingsOptions.map((option) => (
//                                             <label key={option} className="flex items-center space-x-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     name={category}
//                                                     value={option}
//                                                     checked={formData.permissions[category].includes(option)}
//                                                     onChange={handleChange}
//                                                     className="text-blueSecondary dark:text-brand-400"
//                                                 />
//                                                 <span className="text-gray-700 dark:text-white">{option}</span>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex xl:justify-end  justify-center gap-4 mt-4 col-span-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 dark:bg-gray-600 dark:text-white"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blueSecondary text-white rounded-md dark:bg-brand-400"
//                         >
//                             <VscNewFile className="inline-block mr-2" /> Add
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddNewAdmin;



import React, { useState } from "react";
import { VscNewFile } from "react-icons/vsc";

function AddNewAdmin({ onSubmit, onClose, isOpen }) {
    const [formData, setFormData] = useState({
        ID: "",
        adminName: "",
        adminEmail: "",
        phoneNumber: "",
        status: "Active",
        permissions: {
            userManagement: [],
            roleManagement: [],
            collegeManagement: [],
            accountTypeManagement: [],
            commission: [],
            ringtoneManagement: [],
            referManagement: [],
            tradingRuleManagement: [],
            faqManagement: [],
            loginTracking: [],
            ipTracking: [],
            userProblemStatistics: [],
            termsAndConditions: [],
            privacyPolicy: [],
            settings: [],
        },
    });

    const permissionsWithOptions = Object.keys(formData.permissions);
    const settingsOptions = ["Update", "Create", "Delete", "View"];

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (permissionsWithOptions.includes(name)) {
            setFormData((prev) => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [name]: checked
                        ? [...prev.permissions[name], value]
                        : prev.permissions[name].filter((perm) => perm !== value),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Add New Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid xl:grid-cols-4 gap-4">
                        {Object.keys(formData)
                            .filter((key) => key !== "permissions")
                            .map((key) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            ))}
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-white mt-4">Permissions</label>
                        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {permissionsWithOptions.map((category) => (
                                <div key={category} className="border p-3 rounded-md bg-lightPrimary dark:bg-navy-800">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                                        {category.replace(/([A-Z])/g, " $1").trim()}
                                    </label>
                                    <div className="grid gap-2">
                                        {settingsOptions.map((option) => (
                                            <label key={option} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    name={category}
                                                    value={option}
                                                    checked={formData.permissions[category].includes(option)}
                                                    onChange={handleChange}
                                                    className="text-blueSecondary dark:text-brand-400"
                                                />
                                                <span className="text-gray-700 dark:text-white">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 dark:bg-gray-600 dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blueSecondary text-white rounded-md dark:bg-brand-400"
                        >
                            <VscNewFile className="inline-block mr-2" /> Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewAdmin;
