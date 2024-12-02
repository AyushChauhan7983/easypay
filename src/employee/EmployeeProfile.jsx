import React, { useState, useEffect } from "react";
import axios from "axios";

const Employee = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployeeProfile = () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User is not authenticated.");
                return;
            }

            axios
                .get("http://localhost:8080/api/emp/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setProfileData(res.data);
                    setError("");
                })
                .catch((err) => {
                    setError("Unable to fetch profile. Please try again.");
                    setProfileData(null);
                });
        };

        fetchEmployeeProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Employee Profile
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {profileData ? (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <h3 className="text-xl font-medium text-gray-700">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <p>
                                    <strong className="text-gray-600">Employee ID:</strong> {profileData.empId}
                                </p>
                                <p>
                                    <strong className="text-gray-600">First Name:</strong> {profileData.firstName}
                                </p>
                                <p>
                                    <strong className="text-gray-600">Last Name:</strong> {profileData.lastName}
                                </p>
                                <p>
                                    <strong className="text-gray-600">Email:</strong> {profileData.email}
                                </p>
                                <p>
                                    <strong className="text-gray-600">Phone Number:</strong> {profileData.phoneNumber}
                                </p>
                                <p>
                                    <strong className="text-gray-600">Salary:</strong> {profileData.salary}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <h3 className="text-xl font-medium text-gray-700">Job Details</h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <p>
                                    <strong className="text-gray-600">Hire Date:</strong> {new Date(profileData.hireDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong className="text-gray-600">Department ID:</strong> {profileData.departmentId}
                                </p>
                                <p>
                                    <strong className="text-gray-600">User ID:</strong> {profileData.userId}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Employee;
