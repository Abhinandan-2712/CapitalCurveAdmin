import React, { useState } from "react";
import axios from "axios";
import OtpVerification from "./OtpVerification";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("https://capital-curve-apis.onrender.com/api/admin/admin-forgot-password", {
                email,
            });

            if (response.data.success) {
                setMessage(" OTP sent to your email.");
                setShowOtp(true); // Show OTP component if email exists
            } else {
                setError(" Email not found in database.");
            }
        } catch (err) {
            setError(err.response?.data?.message || " Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Handle success after OTP verification
    const handleOtpSuccess = () => {
        alert(" OTP Verified! Redirecting to reset password...");
        // Redirect to Reset Password or desired page here
    };

    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                {!showOtp ? (
                    <>
                        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                            Forgot Password
                        </h4>
                        <p className="mb-9 ml-1 text-base text-gray-600">
                            Enter your email to get OTP!
                        </p>

                        {error && <p className="text-red-500">{error}</p>}
                        {message && <p className="text-green-500">{message}</p>}

                        <form onSubmit={handleForgotPassword}>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className={`mt-4 w-full bg-brand-500 text-white py-2 rounded hover:bg-brand-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Sending OTP..." : "Get OTP"}
                            </button>
                        </form>
                    </>
                ) : (
                    <OtpVerification email={email} onSuccess={handleOtpSuccess} />
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
