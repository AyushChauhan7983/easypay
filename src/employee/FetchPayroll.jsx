import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../payroll/Modal"; // Import the modal component

const EmployeePayroll = () => {
    const [profileData, setProfileData] = useState(null);
    const [payrollData, setPayrollData] = useState([]);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployeeProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User is not authenticated.");
                return;
            }

            try {
                const res = await axios.get("http://localhost:8080/api/emp/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(res.data);
                setError("");
            } catch (err) {
                setError("Unable to fetch profile. Please try again.");
                setProfileData(null);
            }
        };

        fetchEmployeeProfile();
    }, []);

    const fetchPayroll = async () => {
        if (!profileData?.empId) {
            setError("Employee ID not found.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:8080/api/payroll/get_payrollByEmployeeId/${profileData.empId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPayrollData(response.data);
            setSelectedPayroll(response.data[0]); // Assuming the first entry for modal
            setIsModalOpen(true); // Open the modal with data
        } catch (err) {
            setError("Failed to fetch payroll. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Employee Dashboard
                </h2>

                {/* Display Error */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Profile Section */}
                {profileData ? (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <h3 className="text-xl font-medium text-gray-700">
                                Personal Information
                            </h3>
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
                            </div>
                        </div>

                        {/* Fetch Payroll Button */}
                        <div className="mt-4">
                            <button
                                onClick={fetchPayroll}
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                disabled={loading}
                            >
                                {loading ? "Fetching Payroll..." : "Fetch Payroll"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                )}

                {/* Modal Component */}
                {selectedPayroll && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)} // Close modal
                        payrollData={selectedPayroll} // Pass selected payroll data to modal
                    />
                )}
            </div>
        </div>
    );
};

export default EmployeePayroll;
