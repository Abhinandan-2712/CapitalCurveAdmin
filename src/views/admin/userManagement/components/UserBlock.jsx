import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function UserBlock({ isOpen, User, onClose, onDelete }) {
    const [formData, setFormData] = useState({
        status: ""
    });

    if (!isOpen || !User) return null;

    const handleDelete = async () => {
        const loadingToast = toast.loading("Updating User details...");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("You are not logged in. Please log in again.");
                return;
            }

            // Set the status to "delete" before making the API request
            const updatedFormData = { ...formData, status: "Block" };

            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/user/user-blocked/${User._id}`,
                updatedFormData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );
            toast.dismiss(loadingToast);

            if (response.data.success) {
                toast.success("User Block successfully!");
                onDelete(User._id); // Pass the FAQ ID to the parent component
                onClose();
            } else {
                toast.error("Failed to Block User");
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("Error Block User:", error);
            toast.error("Error Block User");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Block User</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to Block this User?
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
                        type="submit"
                        className="bg-blueSecondary text-white px-4 py-2 rounded-md hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-blueSecondary"
                    >
                        Block
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserBlock;