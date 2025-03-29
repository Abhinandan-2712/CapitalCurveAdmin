import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ email, securityToken }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("newPassword", newPassword);
            formData.append("confirmPassword", confirmPassword);
            formData.append("securityToken", securityToken);

            const response = await axios.post(
                "https://capital-curve-apis.onrender.com/api/admin/update-forgot-password",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response)

            if (response.status === 200) {
                setMessage("Password changed successfully!");

                // Redirect to login after 2 seconds
                setTimeout(() => navigate("/auth/sign-in"), 2000);
            } else {
                setError("Failed to change password. Please try again.");
            }
        } catch (err) {
            console.error("Password Change Error:", err);
            setError(err.response?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2">
            <div className="w-full max-w-full flex-col items-center xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Change Password
                </h4>
                <p className="mb-9 ml-1 text-base text-gray-600">
                    Enter your new password for <strong>{email}</strong>
                </p>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {message && <p className="text-green-500 text-center">{message}</p>}

                <form onSubmit={handleChangePassword}>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded mt-1"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-4">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className={`mt-4 w-full text-white py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
