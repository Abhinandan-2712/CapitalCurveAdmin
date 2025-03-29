// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// function Deletevideos({ isOpen, audios, onClose, onDelete }) {
//     // const [formData, setFormData] = useState({
//     //     status: videos?.status || "",
//     // });

//     if (!isOpen || !audios) return null;



//     const handleDelete = async () => {
//         if (!audios?._id) {
//             toast.error("Invalid Ringtone ID.");
//             return;
//         }
//         console.log("Delete Ringtone")

//          const loadingToast=toast.loading("Updating Ringtone details...");

//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 toast.dismiss(loadingToast)
//                 toast.error("You are not logged in. Please log in again.");
//                 return;
//             }
//             console.log(token)

//             const response = await axios.post(
//                 `https://capital-curve-apis.onrender.com/api/ringtone/delete-audio/${audios._id}`, {},
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         token: token,
//                     },
//                 }
//             );
//             toast.dismiss(loadingToast)

//             console.log("Delete Response:", response);

//             if (response.data.success) {
//                 toast.success(response.data.message || "Ringtone deleted successfully!");
//                 onDelete(audios._id);
//                 onClose();
//             } else {
//                 toast.error(response.data.message || "Failed to delete Ringtone.");
//             }
//         } catch (error) {
//             toast.dismiss(loadingToast)
//             console.error("Error deleting Ringtone:", error.response?.data || error.message);
//             toast.error(error.response?.data?.message || "Error deleting Ringtone.");
//         }
//     };



//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
//                 <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Delete Ringtone</h2>
//                 <p className="text-gray-700 dark:text-gray-300">
//                     Are you sure you want to delete this Ringtone?
//                 </p>
//                 <div className="mt-4 flex justify-end gap-4">
//                     <button
//                         type="button"
//                         className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-600 hover:dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleDelete}
//                         type="submit"
//                         className="bg-blueSecondary text-white px-4 py-2 rounded-md hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-blueSecondary"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Deletevideos;

import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function DeleteRingtone({ isOpen, audios, onClose, onDelete }) {
    if (!isOpen || !audios) return null;

    const handleDelete = async () => {
        const loadingToast = toast.loading("Deleting ringtone...");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("You are not logged in. Please log in again.");
                return;
            }

            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/ringtone/delete-audio/${audios._id}`,{},
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );

          

            if (response.data.success) {
                toast.success(response.data.message || "Ringtone deleted successfully!");
                onDelete(audios._id);
                onClose();
            } else {
                toast.error(response.data.message || "Failed to delete ringtone.");
            }
        } catch (error) {
            console.error("Error deleting ringtone:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Error deleting ringtone.");
        } finally{
            toast.dismiss(loadingToast);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Delete Ringtone</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete this ringtone?
                </p>
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        type="button"
                        className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-600 hover:dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-blueSecondary text-white px-4 py-2 rounded-md hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-blueSecondary"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteRingtone;
