import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState("");

    // Fetch All Leaves
    const fetchAllLeaves = () => {
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        axios
            .get("http://localhost:8080/api/admin_getAllLeaves", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const updatedLeaves = res.data.map((leave) => ({
                    ...leave,
                    actionTaken: leave.status !== "PENDING",
                }));
                setLeaves(updatedLeaves);

            })
            .catch(() => {
                setError("Failed to fetch leaves. Please try again.");
            });
    };

    // Handle Approve/Reject Leave Action
    const handleLeaveAction = (leaveId, approved) => {
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        // Disable button and update status immediately
        setLeaves((prevLeaves) =>
            prevLeaves.map((leave) =>
                leave.leaveId === leaveId
                    ? {
                        ...leave,
                        status: approved ? "APPROVED" : "REJECTED",
                        actionTaken: true,
                    }
                    : leave
            )
        );

        axios
            .put(
                `http://localhost:8080/api/admin_approveRejectLeave/${leaveId}?approved=${approved}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                message.success(`Leave ${approved ? "approved" : "rejected"} successfully`);
            })
            .catch(() => {
                setError("Failed to update leave status. Please try again.");
                // Revert status if API call fails
                setLeaves((prevLeaves) =>
                    prevLeaves.map((leave) =>
                        leave.leaveId === leaveId
                            ? {
                                ...leave,
                                status: "PENDING",
                                actionTaken: false,
                            }
                            : leave
                    )
                );
            });
    };

    // Add new leave to the top of the list
    const addNewLeave = (newLeave) => {
        setLeaves((prevLeaves) => {
            // Check if the leave already exists to prevent duplication
            const exists = prevLeaves.some((leave) => leave.leaveId === newLeave.leaveId);
            if (exists) return prevLeaves;

            return [
                {
                    ...newLeave,
                    actionTaken: newLeave.status !== "PENDING",
                },
                ...prevLeaves,
            ];
        });
    };


    // Fetch all leaves on component mount
    useEffect(() => {
        fetchAllLeaves();
    }, []);

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Leave Management</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {leaves.length > 0 ? (
                <div>
                    <h3 className="text-lg font-bold mb-4">Leave Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border p-2">Leave ID</th>
                                    <th className="border p-2">Employee Name</th>
                                    <th className="border p-2">Start Date</th>
                                    <th className="border p-2">End Date</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave) => (
                                    <tr key={leave.leaveId}>
                                        <td className="border p-2 text-center">{leave.leaveId}</td>
                                        <td className="border p-2 text-center">{leave.employee?.firstName}</td>
                                        <td className="border p-2 text-center">{leave.startDate}</td>
                                        <td className="border p-2 text-center">{leave.endDate}</td>
                                        <td className="border p-2 text-center">{leave.status}</td>
                                        <td className="border p-2 text-center space-x-2">
                                            <button
                                                onClick={() => handleLeaveAction(leave.leaveId, true)}
                                                className={`px-3 py-1 rounded ${leave.actionTaken
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600 text-white"
                                                    }`}
                                                disabled={leave.actionTaken}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleLeaveAction(leave.leaveId, false)}
                                                className={`px-3 py-1 rounded ${leave.actionTaken
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500 hover:bg-red-600 text-white"
                                                    }`}
                                                disabled={leave.actionTaken}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No leave requests found.</p>
            )}
        </div>
    );
};

export default LeaveManagement;
