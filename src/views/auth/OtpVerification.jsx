import React, { useState } from "react";
import axios from "axios";
import ChangePassword from "./ResetPassword";
const OtpVerification = ({ email }) => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [securityToken, setSecurityToken] = useState("")
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("https://capital-curve-apis.onrender.com/api/admin/verify-otp", {
                email,
                otp,
            });


            console.log("Response", response);

            if (response.data.success) {

                setSecurityToken(response?.data?.result?.securityToken);
                setMessage(" OTP Verified. Redirecting...");
                setTimeout(() => setIsOtpVerified(true), 1000);
            } else {
                setError(" Invalid OTP. Try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || " Invalid OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // If OTP verified, render ChangePassword component
    if (isOtpVerified) {
        return <ChangePassword securityToken={securityToken} email={email} />;
    }

    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2">
            <div className="w-full max-w-full flex-col items-center xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Verify OTP
                </h4>
                <p className="mb-9 ml-1 text-base text-gray-600">
                    Enter the OTP sent to <strong>{email}</strong>
                </p>

                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}

                <form onSubmit={handleOtpVerification}>
                    <label className="block text-sm font-medium text-gray-700">OTP</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className={`mt-4 w-full text-white py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600"}`}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
