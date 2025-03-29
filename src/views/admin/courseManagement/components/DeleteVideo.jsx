import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function Deletevideos({ isOpen, videos, onClose, onDelete }) {
    const [formData, setFormData] = useState({
        status: videos?.status || "",
    });

    if (!isOpen || !videos) return null;

    const handleDelete = async () => {
        if (!videos?._id) {
            toast.error("Invalid video ID.");
            return;
        }
    
        if (formData.status === "Delete") {
            toast.error("Video has already been deleted.");
            return;
        }
    
        const loadingToast = toast.loading("Deleting video...");
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You are not logged in. Please log in again.");
                return;
            }
    
            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/admin/delete-video/${videos._id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                }
            );
    
            if (response.data?.success) {
                toast.success(response.data.message || "Video deleted successfully!");
                onDelete(videos._id);
                onClose();
            } else {
                toast.error(response.data.message || "Failed to delete video.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Error deleting video.";
            console.error("Error deleting video:", errorMessage);
            toast.error(errorMessage);
        } finally {
            toast.dismiss(loadingToast);
        }
    };
    


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Delete Video</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete this video?
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

export default Deletevideos;
