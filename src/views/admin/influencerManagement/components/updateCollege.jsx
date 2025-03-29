import axios from "axios";
import { useState, useEffect } from "react";
import { VscNewFile } from "react-icons/vsc";
import toast from "react-hot-toast";

function UpdateCollegeModal({ isOpen, College, onClose, onSubmit }) {
    const [details, setDetails] = useState({
        collegeName: "",
        collegeDomain: "",
        phoneNumber: "",
        collegeCode: "",
        collegeEmail: "",
        status: "",
        createdAt: "",
        discountCode: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (College) {
            setDetails({
                collegeName: College?.collegeName || "",
                collegeDomain: College?.collegeDomain || "",
                phoneNumber: College?.phoneNumber || "",
                collegeCode: College?.collegeCode || "",
                collegeEmail: College?.collegeEmail || "",
                status: College?.status || "",
                createdAt: College?.createdAt ? new Date(College.createdAt).toLocaleDateString() : "",
                discountCode: College?.discountCode || "",
            });
        }
    }, [College]);

    if (!College) return null;

    const validateForm = () => {
        let newErrors = {};

        if (!details.collegeName.trim()) newErrors.collegeName = "College name is required.";
        if (!details.collegeEmail.trim()) {
            newErrors.collegeEmail = "College email is required.";
        } else if (!/\S+@\S+\.\S+/.test(details.collegeEmail)) {
            newErrors.collegeEmail = "Invalid email format.";
        }

        if (!details.collegeDomain.trim()) newErrors.collegeDomain = "College domain is required.";

        if (!details.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\d{10}$/.test(details.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits.";
        }

        if (!details.collegeCode.trim()) newErrors.collegeCode = "College code is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        const loadingToast = toast.loading("Updating College details...");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("You are not logged in, Please Log in again");
                return;
            }

            const updatedData = {
                collegeName: details.collegeName,
                collegeDomain: details.collegeDomain,
                phoneNumber: details.phoneNumber,
                collegeCode: details.collegeCode,
                collegeEmail: details.collegeEmail,
                status: details.status,
            };

            const response = await axios.post(
                `https://capital-curve-apis.onrender.com/api/college-type/update-college/${College._id}`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );
            toast.dismiss(loadingToast);

            if (response.data.success) {
                toast.success("College Updated Successfully");
                onClose();
                onSubmit(updatedData);
            } else {
                toast.error(response.data.message || "Failed to update College, please try again");
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("Error", error.response?.data || error.message);
            toast.error(error.response?.data?.messages || "Failed to update College, please try again");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Edit College Management</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                    {Object.keys(details).map((key) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={details[key]}
                                onChange={handleChange}
                                className={`mt-1 p-2 w-full border rounded-md bg-lightPrimary dark:bg-navy-800 text-gray-700 dark:text-white ${
                                    errors[key] ? "border-red-500" : ""
                                }`}
                                required
                                disabled={!["collegeName", "collegeEmail", "collegeDomain", "phoneNumber", "collegeCode", "status"].includes(key)}
                            />
                            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                        </div>
                    ))}
                    <div className="flex justify-end gap-4 mt-4 col-span-3">
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

export default UpdateCollegeModal;





// import { useState, useEffect } from "react";

// function UpdateCollege({ user, onClose, onUpdate }) {
//     if (!user) return null;
    
//     const [permissions, setPermissions] = useState(user?.permissions || {});
//     const [details, setDetails] = useState({
//         ID: user?.ID || "",
//         CollegeName: user?.CollegeName || "",
//         Platform: user?.platform || "",
//         Followers: user?.followers || "",
//         DomainName: user?.DomainName || "",
//         Status: user?.Status || "",
//         CollegeCode: user?.CollegeCode || "",
//         Code: user?.Code || "",
//         Email: user?.Email || "",
//         Number: user?.Number || "",
//         Commission: user?.Commission || "",
//         Usages: user?.Usages || "",
//         date: user?.date ? new Date(user.date).toLocaleDateString() : "",
//     });

//     useEffect(() => {
//         if (!user) return;
//         setPermissions(user.permissions || {});
//         setDetails({
//             ID: user?.ID || "",
//             CollegeName: user?.CollegeName || "",
//             Platform: user?.platform || "",
//             Followers: user?.followers || "",
//             DomainName: user?.DomainName || "",
//             Status: user?.Status || "",
//             CollegeCode: user?.CollegeCode || "",
//             Code: user?.Code || "",
//             Email: user?.Email || "",
//             Number: user?.Number || "",
//             Commission: user?.Commission || "",
//             Usages: user?.Usages || "",
//             date: user?.date ? new Date(user.date).toLocaleDateString() : "",
//         });
//     }, [user]);

//     const handlePermissionChange = (category, perm) => {
//         setPermissions(prev => {
//             const updated = { ...prev };
//             updated[category] = updated[category]?.includes(perm)
//                 ? updated[category].filter(p => p !== perm)
//                 : [...(updated[category] || []), perm];
//             return updated;
//         });
//     };

//     const handleDetailChange = (e) => {
//         setDetails(prev => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
//             <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border max-h-[90vh] overflow-y-auto">
//                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Details</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {["ID", "CollegeName", "Platform", "Followers", "CollegeCode", "DomainName", "Code", "Email", "Number", "Commission", "Usages", "Status", "date"].map((key, index) => (
//                         <div key={index}>
//                             <label className="block font-semibold">{key}:</label>
//                             <input
//                                 type="text"
//                                 name={key}
//                                 className="w-full px-4 py-2 border rounded-md dark:bg-navy-800 dark:text-white"
//                                 value={details[key]}
//                                 onChange={handleDetailChange}
//                                 disabled={key === "ID" || key === "date"}
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <label className="block text-lg font-medium text-gray-700 dark:text-white mt-6">Permissions</label>
//                 {Object.keys(permissions).length > 0 ? (
//                     <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
//                         {Object.entries(permissions).map(([category, perms], index) => (
//                             <div key={index} className="border p-3 rounded-md bg-lightPrimary dark:bg-navy-800">
//                                 <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">{category.replace(/([A-Z])/g, " $1").trim()}</h4>
//                                 <div className="grid gap-2">
//                                     {["View", "Update", "Delete", "Create"].map((perm, i) => (
//                                         <label key={i} className="flex items-center space-x-2">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={perms.includes(perm)}
//                                                 onChange={() => handlePermissionChange(category, perm)}
//                                             />
//                                             <span className="text-gray-700 dark:text-white">{perm}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-500 dark:text-gray-400 mt-2">No permissions assigned</p>
//                 )}
//                 <div className="flex gap-5">
//                     <button onClick={onClose} className="mt-6 px-4 py-2 bg-gray-400 text-white rounded-md w-full">
//                         Close
//                     </button>
//                     <button onClick={() => onUpdate(details, permissions)} className="mt-6 px-4 py-2 bg-blueSecondary text-white rounded-md w-full">
//                         Update
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UpdateCollege;
