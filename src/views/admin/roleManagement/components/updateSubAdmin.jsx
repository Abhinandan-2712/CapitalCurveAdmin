 import { useState,useEffect } from "react";
 function UpdateUserModal({ user, onClose, onUpdate }) {
    const [permissions, setPermissions] = useState(user.permissions || {});
    const [details, setDetails] = useState(user.details || {
        userID: user.userID || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.Role || "",
        status: user.status || "",
        date: new Date(user.date).toLocaleDateString() || "",
    });

    useEffect(() => {
        setPermissions(user.permissions || {});
        setDetails({
            userID: user.userID || "",
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            role: user.Role || "",
            status: user.status || "",
            date: new Date(user.date).toLocaleDateString() || "",
        });
    }, [user]);

    if (!user) return null;

    const handlePermissionChange = (category, perm) => {
        setPermissions((prevPermissions) => {
            const updatedPermissions = { ...prevPermissions };

            if (updatedPermissions[category]) {
                if (updatedPermissions[category].includes(perm)) {
                    updatedPermissions[category] = updatedPermissions[category].filter((p) => p !== perm);
                } else {
                    updatedPermissions[category].push(perm);
                }
            } else {
                updatedPermissions[category] = [perm];
            }

            return updatedPermissions;
        });
    };

    const handleDetailChange = (e) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white ">
                
                {/* User Details Section */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { label: "ID", key: "userID" },
                        { label: "Name", key: "name" },
                        { label: "Email", key: "email" },
                        { label: "Phone", key: "phone" },
                        { label: "Role", key: "role" },
                        { label: "Status", key: "status" },
                        { label: "Date", key: "date" },
                    ].map((detail, index) => (
                        <div key={index} className="text-gray-600 dark:text-white">
                            <label className="block font-semibold">{detail.label}:</label>
                            <input
                                type="text"
                                name={detail.key}
                                className="w-full px-4 py-2 border border-gray-600 rounded-md dark:bg-navy-800 dark:text-white"
                                value={details[detail.key]}
                                onChange={handleDetailChange}
                                disabled={detail.key === "userID" || detail.key === "date"} 
                            />
                        </div>
                    ))}
                </div>

                {/* Permissions Section */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-white mt-6">Permissions</label>
                    {Object.keys(permissions).length > 0 ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            {Object.entries(permissions).map(([category, perms], index) => (
                                <div key={index} className="border p-3 rounded-md bg-lightPrimary dark:bg-navy-800">
                                    <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                                        {category.replace(/([A-Z])/g, " $1").trim()}
                                    </h4>
                                    <div className="grid gap-2">
                                        {["View", "Update", "Delete", "Create"].map((perm, i) => (
                                            <label key={i} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="text-blueSecondary dark:text-brand-400"
                                                    checked={perms.includes(perm)}
                                                    onChange={() => handlePermissionChange(category, perm)}
                                                />
                                                <span className="text-gray-700 dark:text-white">{perm}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 mt-2">No permissions assigned</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-5">
                    <button
                        onClick={onClose}
                        className="mt-6 px-4 py-2 bg-gray-400 text-white rounded-md dark:bg-gray-600 w-full"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => onUpdate(details, permissions)}
                        className="mt-6 px-4 py-2 bg-blueSecondary text-white rounded-md dark:bg-brand-400 w-full"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateUserModal;
