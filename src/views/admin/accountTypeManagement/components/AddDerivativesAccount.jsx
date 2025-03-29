import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

function AddEquityAccount({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    accountType: "Derivative ",
    accountSize: "",
    status: "Active",
    price:"",
    videoUnlocked:"",
    // "Number Of Video":""
   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     const loadingToast=toast.loading("Please wait... ");
     try {
       const token = localStorage.getItem("token");
       if (!token) {
        toast.dismiss(loadingToast)
         toast.error("Authentication required");
         return;
       }
 
       const response = await axios.post(
         "https://capital-curve-apis.onrender.com/api/account-type/add-plan",
         formData,
         {
           headers: {
             "Content-Type": "application/json",
             token: token,
           },
         }
       );
      //  console.log(response)
 
       if (response.data && response.data.success) {
         toast.success("Account Type added successfully!");
         
         onSubmit(response.data.result);
         onClose();
       } else {
         toast.error("Failed to add Account Type");
       }
     } catch (error) {
       console.error("Error adding Account Type:", error);
       toast.error("Error adding Account Type");
     }
     finally{
       toast.dismiss(loadingToast)
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

  );
}

export default AddEquityAccount;
