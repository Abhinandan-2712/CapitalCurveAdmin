// import React, { useEffect, useState } from 'react';
// import { toast } from "react-hot-toast";
// import axios from 'axios';

// function ViewUser({ user, onClose, isOpen, onSubmit }) {
//     const [details, setDetails] = useState({
//         ID: user.userId || "",
//         Name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//         Email: user.email || "",
//         Number: user.mobileNumber || "",
//         Aadhar: user.aadharCard || "",
//         Pan: user.panCard || "",
//         AccountBalance: user.accountBalance || "",
//         ReferralBy: user.referralBy || "",
//         Code: user.referralCode || "",
//         Date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
//         Status: user.status || "",
//     });

//     useEffect(() => {
//         setDetails({
//             ID: user.userId || "",
//             Name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//             Email: user.email || "",
//             Number: user.mobileNumber || "",
//             Aadhar: user.aadharCard || "",
//             Pan: user.panCard || "",
//             AccountBalance: user.accountBalance || "",
//             ReferralBy: user.referralBy || "",
//             Code: user.referralCode || "",
//             Date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
//             Status: user.status || "",
//         });
//     }, [user]);

//     const handleDetailChange = (e) => {
//         setDetails((prevDetails) => ({
//             ...prevDetails,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 toast.error("You are not logged in. Please log in again.");
//                 return;
//             }

//             const response = await axios.post(
//                 `https://capital-curve-apis.onrender.com/api/user/user-status-handel/${user._id}`,
//                 { Status: details.Status }, // Only sending Status update
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         token: token,
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 toast.success("Status updated successfully!");
//                 onClose();
//                 onSubmit(details.Status); // Update parent component with new Status
//             } else {
//                 toast.error(response.data.message || "Failed to update status. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             toast.error(error.response?.data?.message || "Failed to update status. Please try again.");
//         }
//     };

//     if (!user) return null;

//     const userDetails = [
//         { label: "ID", value: details.ID, disabled: true },
//         { label: "Name", value: details.Name, disabled: true },
//         { label: "Email", value: details.Email, disabled: true },
//         { label: "Phone", value: details.Number, disabled: true },
//         { label: "Aadhar", value: details.Aadhar, disabled: true },
//         { label: "Pan", value: details.Pan, disabled: true },
//         { label: "Account Balance", value: details.AccountBalance, disabled: true },
//         { label: "Referral By", value: details.ReferralBy, disabled: true },
//         { label: "Code", value: details.Code, disabled: true },
//         { label: "Joining Date", value: details.Date, disabled: true },
//         { label: "Status", value: details.Status, disabled: false }, // Only Status is editable
//     ];

//     return (
//         <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50'>
//             <div className='bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white '>
//                 <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-4'>User Details</h2>

//                 <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
//                     {userDetails.map((detail, index) => (
//                         <div key={index} className="text-gray-600 dark:text-white">
//                             <label className="block font-semibold">{detail.label}:</label>
//                             <input
//                                 type="text"
//                                 name={detail.label.toLowerCase().replace(/\s+/g, '')}
//                                 className="w-full px-4 py-2 border border-gray-600 rounded-md dark:bg-navy-800 dark:text-white"
//                                 value={detail.value}
//                                 onChange={handleDetailChange}
//                                 disabled={detail.disabled}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 <button 
//                     className='mt-4 w-full px-4 py-2 text-white bg-blueSecondary dark:bg-brand-400 rounded-md hover:bg-blue-700 dark:hover:bg-brand-500' 
//                     onClick={onClose}
//                 >
//                     Close
//                 </button>
                
//                 <button 
//                     className='mt-4 w-full px-4 py-2 text-white bg-blueSecondary dark:bg-brand-400 rounded-md hover:bg-blue-700 dark:hover:bg-brand-500' 
//                     onClick={handleSubmit} 
//                 >
//                     Update Status
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default ViewUser;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function EditUser({ user, onClose, isOpen, onSubmit }) {
   // Prevents errors when user is not passed

    const [details, setDetails] = useState({
        ID: user.userId || "",
        Name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        Email: user.email || "",
        Number: user.mobileNumber || "",
        Aadhar: user.aadharCard || "",
        Pan: user.panCard || "",
        AccountBalance: user.accountBalance || "",
        ReferralBy: user.referralBy || "",
        Code: user.referralCode || "",
        Date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
        status: user.status || "Active", // Lowercase to match state updates
    });

    useEffect(() => {
        if (user) {
            setDetails({
                ID: user.userId || "",
                Name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                Email: user.email || "",
                Number: user.mobileNumber || "",
                Aadhar: user.aadharCard || "",
                Pan: user.panCard || "",
                AccountBalance: user.accountBalance || "",
                ReferralBy: user.referralBy || "",
                Code: user.referralCode || "",
                Date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
                status: user.status || "Active",
            });
        }
    }, [user]);

    const handleDetailChange = (e) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Updating status...");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("You are not logged in. Please log in again.");
                return;
            }

            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/user/user-status-handel/${user._id}`,
                { status: details.status }, // Send only status
                {
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                }
            );
            console.log(response);

            if (response.data.message) {
                toast.success("Status updated successfully!");
                onSubmit(details.status);
                onClose();
            } else {
                toast.error(response.data.message || "Failed to update status. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to update status. Please try again.");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const userDetails = [
        { label: "ID", value: details.ID, disabled: true },
        { label: "Name", value: details.Name, disabled: true },
        { label: "Email", value: details.Email, disabled: true },
        { label: "Phone", value: details.Number, disabled: true },
        { label: "Aadhar", value: details.Aadhar, disabled: true },
        { label: "Pan", value: details.Pan, disabled: true },
        { label: "Account Balance", value: details.AccountBalance, disabled: true },
        { label: "Referral By", value: details.ReferralBy, disabled: true },
        { label: "Code", value: details.Code, disabled: true },
        { label: "Joining Date", value: details.Date, disabled: true },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Details</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {userDetails.map((detail, index) => (
                        <div key={index} className="text-gray-600 dark:text-white">
                            <label className="block font-semibold">{detail.label}:</label>
                            <input
                                type="text"
                                name={detail.label.toLowerCase().replace(/\s+/g, "")}
                                className="w-full px-4 py-2 border border-gray-600 rounded-md dark:bg-navy-800 dark:text-white"
                                value={detail.value}
                                disabled={detail.disabled}
                            />
                        </div>
                    ))}

                    {/* Status Dropdown */}
                    <div className="text-gray-600 dark:text-white">
                        <label className="block font-semibold">Status:</label>
                        <select
                            name="status"
                            value={details.status}
                            onChange={handleDetailChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-md dark:bg-navy-800 dark:text-white"
                        >
                            <option value="Active">Active</option>
                            <option value="Delete">Delete</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button
                        className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        className="flex-1 px-4 py-2 text-white bg-blueSecondary dark:bg-brand-400 rounded-md hover:bg-blue-700 dark:hover:bg-brand-500"
                        onClick={handleSubmit}
                    >
                        Update Status
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
