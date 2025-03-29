import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditRingtone = ({ isOpen, ringtone, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: ringtone?.title || "",
        description: ringtone?.description || "",
        duration: ringtone?.duration || "",
        status: ringtone?.status || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Updating Ringtone details...");
    
        if (!formData.title || !formData.description || !formData.duration) {
            toast.dismiss(loadingToast);
            toast.error("Please fill all the fields");
            return;
        }
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("Please Login");
                return;
            }

    
            await axios.post(
                `https://capital-curve-apis.onrender.com/api/ringtone/edit-audio/${ringtone?._id}`,
                formData,
                { headers: { "Content-Type": "application/json", token } }
            );
    
            toast.dismiss(loadingToast);
            toast.success("Ringtone updated successfully");
            onSave(formData);
            onClose();
        } catch (error) {
            
            toast.error("Failed to update ringtone");
            console.error("Error updating ringtone:", error);
        } 
        finally{
            toast.dismiss(loadingToast);
        }
    };
    
    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                    <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Edit Ringtone</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
                                />
                            </label>

                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
                                Description:
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
                                Status:
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Delete">Delete</option>
                                </select>
                            </label>
                        </div>
                        {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={onClose} className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-600 hover:dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blueSecondary text-white px-4 py-2 rounded-md hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-blueSecondary"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditRingtone;
