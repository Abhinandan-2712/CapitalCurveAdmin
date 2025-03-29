import React, { useState } from "react";
import { VscNewFile } from "react-icons/vsc";

import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.error('Here is your toast.');

function AddCollegeModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    "ID": "",
    "College Name": "",
    "College Email": "",
    "College Code": "",
    "College Domain": "",
    "Phone Number": "",
    "Status": "Active",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  gap-10 flex-row   ">
      <div className=" bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4 ">Add New Institute</h2>

        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-4 ">
          {Object.keys(formData).map((key) => (
            <div key={key}  >
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white outline-none"
                required
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-4">
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
              <VscNewFile onClick={notify} className="inline-block mr-2" /> Add

            </button>
            <Toaster />

          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCollegeModal;
