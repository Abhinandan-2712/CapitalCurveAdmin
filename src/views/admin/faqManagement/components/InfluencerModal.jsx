// import React, { useState } from "react";
// import { VscNewFile } from "react-icons/vsc";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// function AddInfluencerModal({ isOpen, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     status: "Active",
//     question: "",
//     answer: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("You are not logged in. Please log in again.");
//         return;
//       }

//       const response = await axios.post(
//         "https://capital-curve-apis.onrender.com/api/faq/create-faq",
//         formData, // Directly passing the object instead of FormData
//         {
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("FAQ added successfully!");
//         onClose();
//         onSubmit();
//       } else {
//         toast.error(response.data.message || "Failed to add FAQ. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to add FAQ. Please try again.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
//       <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Add New FAQ</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
// {Object.keys(formData).map((key) => (
//   <div key={key}>
//     <label className="block text-sm font-medium text-gray-700 dark:text-white">
//       {key.charAt(0).toUpperCase() + key.slice(1)}
//     </label>
//     <input
//       type="text"
//       name={key}
//       value={formData[key]}
//       onChange={handleChange}
//       className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white"
//       required
//     />
//   </div>
// ))}
//         <div className="flex justify-end gap-4 mt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 dark:bg-gray-600 dark:text-white"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blueSecondary text-white rounded-md dark:bg-brand-400"
//           >
//             <VscNewFile className="inline-block mr-2" /> Add
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );
// }

// export default AddInfluencerModal;



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AddInfluencerModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating FAQ details...");

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.dismiss(loadingToast);
            toast.error("Authentication required");
            return;
        }

        // Validate formData before sending
        if (!formData.question || !formData.answer) {
            toast.dismiss(loadingToast);
            toast.error("Please provide both question and answer.");
            return;
        }

        const response = await axios.post(
            "https://capital-curve-apis.onrender.com/api/faq/create-faq",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
            }
        );

        if (response.data?.success) {
            toast.success(response.data.message || "FAQ added successfully!");
            onSubmit(response.data.result);
            onClose();
        } else {
            toast.error(response.data.message || "Failed to add FAQ");
        }
    } catch (error) {
        console.error("Error adding FAQ:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Error adding FAQ");
    } finally {
        toast.dismiss(loadingToast);
    }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Add New FAQ</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {key.charAt(0).toUpperCase() + key.slice(1)}
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

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>




        </form>


      </div>
    </div>

    // </div>
  );
}

export default AddInfluencerModal;