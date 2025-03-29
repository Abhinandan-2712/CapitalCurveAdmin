import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function DeleteFAQ({ isOpen, faq, onClose, onDelete }) {
    const [formData, setFormData] = useState({
        status: ""
    });

    if (!isOpen || !faq) return null;

    const handleDelete = async () => {
        const loadingToast = toast.loading("Deleting FAQ...");
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("You are not logged in. Please log in again.");
                return;
            }
    
            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/faq/delete-faq/${faq._id}`,
                { status: "delete" }, // Directly setting status instead of spreading formData
                {
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                }
            );
    
            if (response.data?.success) {
                toast.success(response.data.message || "FAQ deleted successfully!");
                onDelete(faq._id); // Inform parent component about deletion
                onClose();
            } else {
                toast.error(response.data.message || "Failed to delete FAQ.");
            }
        } catch (error) {
            console.error("Error deleting FAQ:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Error deleting FAQ.");
        } finally {
            toast.dismiss(loadingToast);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Edit FAQ</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete this FAQ?
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

export default DeleteFAQ;