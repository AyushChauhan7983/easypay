import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const EmployeeLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch Employee's Leaves Data
        const fetchLeaves = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User is not authenticated.");
                return;
            }

            try {
                // Fetch employee profile to get empId
                const profileRes = await axios.get("http://localhost:8080/api/emp/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const empId = profileRes.data.empId;  // Get the employee ID

                if (!empId) {
                    setError("Employee ID not found.");
                    return;
                }

                // Fetch leaves data using the empId
                setLoading(true);
                const leavesRes = await axios.get(`http://localhost:8080/api/emp/leaves/${empId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLeaves(leavesRes.data);
                setError("");  // Clear any previous error
            } catch (err) {
                console.error("Error fetching leaves:", err);  // Log the error for debugging
                setError("Unable to fetch leaves. Please try again.");
                setLeaves([]);  // Clear any previous leaves data
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">My Leaves</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Leave Type</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Start Date</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">End Date</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.length > 0 ? (
                                    leaves.map((leave) => (
                                        <tr key={leave.leaveId}>
                                            <td className="px-4 py-2 border border-gray-300">{leave.leaveType}</td>
                                            <td className="px-4 py-2 border border-gray-300">{new Date(leave.startDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 border border-gray-300">{new Date(leave.endDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm ${leave.status === "APPROVED"
                                                        ? "bg-green-200 text-green-800"
                                                        : leave.status === "REJECTED"
                                                            ? "bg-red-200 text-red-800"
                                                            : "bg-yellow-200 text-yellow-800"
                                                        }`}
                                                >
                                                    {leave.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center">
                                            No leaves available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeLeaves;
