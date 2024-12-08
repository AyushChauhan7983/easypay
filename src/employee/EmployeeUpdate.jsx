import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from 'antd';

const EmployeeUpdate = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        salary: "",
    });

    useEffect(() => {
        if (!employeeId) {
            setProfileData(null);
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:8080/api/emp/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProfileData(res.data);
                setFormData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    salary: res.data.salary,
                });
                setError("");
            })
            .catch((err) => {
                setError("Unable to fetch profile. Please try again.");
                setProfileData(null);
            });
    }, [employeeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateEmployeeProfile = () => {
        if (!employeeId) {
            setError("Employee ID is required to update.");
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .put(`http://localhost:8080/api/emp/update_info/${employeeId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProfileData(res.data);
                setError("");
                message.success('Profile updated successfully');
            })
            .catch((err) => {
                setError("Unable to update profile. Please try again.");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Employee Profile</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-6">
                    <label className="block text-gray-600">Employee ID</label>
                    <input
                        type="text"
                        placeholder="Enter Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="p-2 mt-3 border border-gray-300 rounded w-full"
                    />
                </div>

                {profileData && (
                    <div>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                        </div>

                        <button
                            onClick={updateEmployeeProfile}
                            className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
                        >
                            Update Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeUpdate;
