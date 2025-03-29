import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { VscNewFile } from "react-icons/vsc";

const VideoUpdate = ({ videos, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: videos?.title || "",
    description: videos?.description || "",
    status: videos?.status || "Active",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: e.target.files[0], 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videos?._id) {
        toast.error("Invalid video data.");
        return;
    }

    if (!formData.title || !formData.description) {
        toast.error("Title and description are required.");
        return;
    }

    const loadingToast = toast.loading("Updating video details...");

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You are not logged in. Please log in again.");
            return;
        }

        // Use FormData for file uploads
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("status", formData.status);
        if (formData.thumbnail) {
            formDataToSend.append("thumbnail", formData.thumbnail);
        }

        const response = await axios.post(
            `https://capital-curve-apis.onrender.com/api/admin/edit-video/${videos._id}`,
            formDataToSend,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token,
                },
            }
        );

        if (response.data.success) {
            toast.success("Video updated successfully!");
            onSubmit(formData);
            onClose();
        } else {
            toast.error(response.data.message || "Failed to update video.");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to update video.";
        console.error("Error:", errorMessage);
        toast.error(errorMessage);
    } finally {
        toast.dismiss(loadingToast);
    }
};


  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Edit FAQ</h2>
        <form onSubmit={handleSubmit}>
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

          <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
            />
          </label>

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

          <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
            Thumbnail:
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
            />
          </label>

          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-600 hover:dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blueSecondary text-white px-4 py-2 rounded-md hover:bg-brandLinear dark:bg-brand-400 dark:hover:bg-blueSecondary"
            >
              <VscNewFile className="inline-block mr-2" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>


    // <div className="p-4 bg-white rounded-lg shadow-md dark:bg-navy-900">
    //   <h2 className="text-xl font-semibold mb-4">Update Video</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label className="block text-sm font-medium text-gray-700 dark:text-white">
    //       Title:
    //       <input
    //         type="text"
    //         name="title"
    //         value={formData.title}
    //         onChange={handleChange}
    //         className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
    //       />
    //     </label>

    //     <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
    //       Description:
    //       <textarea
    //         name="description"
    //         value={formData.description}
    //         onChange={handleChange}
    //         className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
    //       />
    //     </label>

    //     <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
    //       Status:
    //       <select
    //         name="status"
    //         value={formData.status}
    //         onChange={handleChange}
    //         className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
    //       >
    //         <option value="Active">Active</option>
    //         <option value="Delete">Delete</option>
    //       </select>
    //     </label>

    //     <label className="block text-sm font-medium text-gray-700 dark:text-white mt-3">
    //       Thumbnail:
    //       <input
    //         type="file"
    //         name="thumbnail"
    //         accept="image/*"
    //         onChange={handleFileChange}
    //         className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
    //       />
    //     </label>

    //     <div className="flex justify-end mt-4">
    //       <button
    //         type="button"
    //         onClick={onClose}
    //         className="mr-2 p-2 bg-gray-500 text-white rounded-md"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         className="p-2 bg-blue-600 text-white rounded-md"
    //       >
    //         Update
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default VideoUpdate;
