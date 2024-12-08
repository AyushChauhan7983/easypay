import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const UpdateUser = () => {
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const isTokenValid = () => {
        const token = getToken();
        if (!token) {
            setErrorMessage("You must be logged in to perform this action.");
            return false;
        }
        return true;
    };

    const handleEditUsername = async () => {
        if (!isTokenValid()) return;

        try {
            const token = getToken();
            const response = await axios.post(
                `http://localhost:8080/api/admin_editUsername/${username}/${newUsername}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage(response.data);
            message.success("Username updated successfully");
            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Unauthorized access. Please login.");
            } else {
                setErrorMessage(error.response.data.message || "An error occurred");
            }
            setSuccessMessage("");
        }
    };

    const handleEditRole = async () => {
        if (!isTokenValid()) return;

        try {
            const token = getToken();
            const response = await axios.post(
                `http://localhost:8080/api/admin_editUserRole/${username}/${role}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage(response.data);
            message.success("Role updated successfully");
            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Unauthorized access. Please login.");
            } else {
                setErrorMessage(error.response.data.message || "An error occurred");
            }
            setSuccessMessage("");
        }
    };

    const handleEditPassword = async () => {
        if (!isTokenValid()) return;
        if (!validatePassword()) return;

        setLoading(true);

        try {
            const token = getToken();
            const response = await axios.post(
                `http://localhost:8080/api/admin_editUserPwd/${username}/${password}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage(response.data);
            message.success("Password updated successfully");
            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Unauthorized access. Please login.");
            } else {
                setErrorMessage(error.response.data.message || "An error occurred");
            }
            setSuccessMessage("");
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Update User Information</h2>
            <div className="space-y-6">
                {/* Username Update Form */}
                <div>
                    <h3 className="text-xl font-semibold">Update Username</h3>
                    <div className="flex gap-4 mt-2">
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-1/2"
                        />
                        <input
                            type="text"
                            placeholder="Enter new username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-1/2"
                        />
                    </div>
                    <button
                        onClick={handleEditUsername}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Update Username
                    </button>
                </div>

                {/* Role Update Form */}
                <div>
                    <h3 className="text-xl font-semibold">Update Role</h3>
                    <div className="mt-2">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="" disabled>Select a role</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="PAYROLL_MANAGER">PAYROLL_MANAGER</option>
                        </select>
                    </div>
                    <button
                        onClick={handleEditRole}
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        Update Role
                    </button>
                </div>


                {/* Password Update Form */}
                <div>
                    <h3 className="text-xl font-semibold">Update Password</h3>
                    <div className="mt-2">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <button
                        onClick={handleEditPassword}
                        className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </div>

            {/* Error or Success Message */}
            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
            {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
        </div>
    );
};

export default UpdateUser;
