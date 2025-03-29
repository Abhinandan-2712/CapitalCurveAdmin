import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");


    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found. Please log in again.");
        return;
      }

      const formdata = new FormData();
      formdata.append("oldPassword", oldPassword);
      formdata.append("newPassword", newPassword);
      formdata.append("confirmPassword", confirmPassword);


      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/admin/change-password",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": token
          },
        }
      );

      if (response.data.success) {
        setMessage("Password updated successfully.");
        toast.success("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Error updating password: " + response.data.message);
      }
    } catch (error) {
      console.error("Password change failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid password.");
    }
  };

  return (
    <div className="h-fit col-span-12 lg:!mb-0">
      <Toaster />
      <form onSubmit={handlePasswordChange}>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <label className="block text-sm font-medium text-gray-700">
          Old Password
        </label>
        <input
          className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 text-center p-2"
          placeholder="Enter Old Password"
          required
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">
          New Password
        </label>
        <input
          className={`block w-full text-sm bg-transparent border ${error ? "border-red-500" : "dark:border-white/10"} bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 text-center p-2`}
          placeholder="Enter New Password"
          required
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          title="Must contain at least 8 characters, including uppercase, lowercase letters, and a number."
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">
          Confirm Password
        </label>
        <input
          className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 text-center p-2"
          placeholder="Enter Confirm Password"
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="w-full mt-4 rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
