import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscNewFile } from "react-icons/vsc";

function AddCollege({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeEmail: "",
    collegeDomain: "",
    phoneNumber: "",
    collegeCode: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.collegeName.trim()) newErrors.collegeName = "College name is required.";
    if (!formData.collegeEmail.trim()) {
      newErrors.collegeEmail = "College email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.collegeEmail)) {
      newErrors.collegeEmail = "Invalid email format.";
    }

    if (!formData.collegeDomain.trim()) newErrors.collegeDomain = "College domain is required.";
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!formData.collegeCode.trim()) newErrors.collegeCode = "College code is required.";
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const loadingToast = toast.loading("Adding college...");
    
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("Authentication required");
        return;
      }

      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/college-type/create-college",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(response)

      toast.dismiss(loadingToast);
      if (response.data && response.data.success) {
        toast.success("College added successfully!");
        onSubmit(response.data.result);
        onClose();
      } else {
        toast.error(response.data.message || "Failed to add college");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error adding college:", error);
      toast.error("Error adding college");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll gap-10 flex-row">
      <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Add New College</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
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
                  className={`mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white ${
                    errors[key] ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blueSecondary text-white rounded-md dark:bg-brand-400"
            >
              <VscNewFile className="inline-block mr-2" /> Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCollege;
