import React, { useState, useEffect } from "react";
import { VscNewFile } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-hot-toast";

function EditAccountTypeModal({ isOpen, onClose, onSubmit, AccT }) {
  const [formData, setFormData] = useState({
    price: "",
    accountSize: "",
    videoUnlocked: "",
    status: "",
  });

  useEffect(() => {
    if (AccT && AccT._id) {
      setFormData({
        _id: AccT._id,
        price: AccT.price || "",
        accountSize: AccT.accountSize || "",
        videoUnlocked: AccT.videoUnlocked || "",
        status: AccT.status || "",
      });
    }
  }, [AccT]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.price || !formData.accountSize || !formData.videoUnlocked || !formData.status) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in. Please log in again.");
        return;
      }

      const response = await axios.post(
        `https://capital-curve-apis.onrender.com/api/account-type/edit-plan/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Account Type updated successfully!");
        onClose();
        onSubmit(formData);
      } else {
        toast.error(response.data.message || "Failed to update Account Type. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update Account Type. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Edit Account Type</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {["price", "accountSize", "videoUnlocked","status"].map((key) => (
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
          <div className="flex justify-end gap-4 mt-4 col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 dark:bg-gray-600 dark:text-white"
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
  );
}

export default EditAccountTypeModal;
