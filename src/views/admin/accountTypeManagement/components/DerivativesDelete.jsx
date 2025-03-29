import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function DeleteAcct({ isOpen, AccT, onClose, onDelete }) {
    const [formData, setFormData] = useState({
        status: ""
    });

    if (!isOpen || !AccT) return null;

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You are not logged in. Please log in again.");
                return;
            }

            // Set the status to "delete" before making the API request
            const updatedFormData = { ...formData, status: "delete" };

            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/account-type/delete-plan/${AccT._id}`,
                updatedFormData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );
            console.log(response);

            if (response.data.success) {
                toast.success("Account Type deleted successfully!");
                onDelete(AccT._id); // Pass the FAQ ID to the parent component
                onClose();
            } else {
                toast.error("Failed to delete Account Type");
            }
        } catch (error) {
            console.error("Error deleting Account Type:", error);
            toast.error("Error deleting Account Type");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Delete Account Type</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete this Account Type?
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
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAcct;