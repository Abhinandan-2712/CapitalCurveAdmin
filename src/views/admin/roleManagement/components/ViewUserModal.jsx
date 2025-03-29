import React from "react";

function ViewUserModal({ user, onClose }) {
    if (!user) return null;


    const userDetails = [
        { label: "ID", value: user.userID },
        { label: "Name", value: user.name },
        { label: "Email", value: user.email },
        { label: "Phone", value: user.phone },
        { label: "Role", value: user.Role },
        { label: "Status", value: user.status },
        { label: "Date", value: new Date(user.date).toLocaleDateString() },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-900 scrollbar-track-white">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Details</h2>


                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {userDetails.map((detail, index) => (
                        <div key={index} className="text-gray-600 dark:text-white">
                            <label className="block text-sm font-medium">
                                {detail.label}:
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-navy-800 dark:text-white outline-none"
                                value={detail.value}
                                readOnly
                            />
                        </div>
                    ))}
                </div>


                <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-white mt-4">Permissions</label>

                    {user.permissions && Object.keys(user.permissions).length > 0 ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            {Object.entries(user.permissions).map(([category, permissions], index) => (
                                <div key={index} className="border p-3 rounded-md bg-lightPrimary dark:bg-navy-800">
                                    <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                                        {category.replace(/([A-Z])/g, " $1").trim()}
                                    </h4>

                                    <div className="grid gap-2">
                                        {permissions.length > 0 ? (
                                            permissions.map((perm, i) => (
                                                <label key={i} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blueSecondary dark:text-brand-400"
                                                        checked
                                                    />
                                                    <span className="text-gray-700 dark:text-white">{perm}</span>
                                                </label>
                                            ))
                                        ) : (
                                            <span className="text-sm text-gray-500 dark:text-gray-400">No permissions</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 mt-2">No permissions assigned</p>
                    )}
                </div>





                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-blueSecondary text-white rounded-md dark:bg-brand-400 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default ViewUserModal;
