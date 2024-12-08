import React, { useState } from "react";
import axios from "axios";

const LeaveRequest = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");

    // List of available leave types
    const leaveTypes = [
        "Sick Leave",
        "Casual Leave",
        "Earned Leave",
        "Maternity Leave",
        "Paternity Leave",
        "Unpaid Leave",
    ];

    const submitLeaveRequest = () => {
        if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
            setError("All fields are required.");
            setConfirmationMessage("");
            return;
        }

        const token = localStorage.getItem("token");

        const leaveRequestData = {
            leaveType,
            startDate,
            endDate,
            reason,
        };

        axios
            .post(`http://localhost:8080/api/emp/leave_request/${employeeId}`, leaveRequestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setConfirmationMessage("Leave request submitted successfully!");
                setError("");
                setEmployeeId("");
                setLeaveType("");
                setStartDate("");
                setEndDate("");
                setReason("");
            })
            .catch((err) => {
                setError("Failed to submit leave request. Please try again.");
                setConfirmationMessage("");
            });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Leave Request Form</h1>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />

                {/* Leave Type Dropdown */}
                <div>
                    <label htmlFor="leaveType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Leave Type
                    </label>
                    <select
                        id="leaveType"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="" disabled>Select a leave type</option>
                        {leaveTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-1/2 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-1/2 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>
                <textarea
                    placeholder="Reason for Leave"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    rows="4"
                ></textarea>
                <button
                    onClick={submitLeaveRequest}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                    Submit Leave Request
                </button>
            </div>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {confirmationMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                    <h2 className="text-lg font-bold text-center">{confirmationMessage}</h2>
                </div>
            )}
        </div>
    );
};

export default LeaveRequest;
