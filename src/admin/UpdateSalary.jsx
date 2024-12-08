import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const UpdateEmployeeSalary = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [newSalary, setNewSalary] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!employeeId || !newSalary) {
            setError("Please fill in all fields.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        axios
            .put(
                `http://localhost:8080/api/admin_updateEmployeeSalary/${employeeId}?newSalary=${newSalary}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                message.success("Salary updated successfully");
                setEmployeeId("");
                setNewSalary("");
            })
            .catch((err) => {
                setError("Failed to update salary. Please check the data and try again.");
            });
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Update Employee Salary</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Employee ID</label>
                    <input
                        type="number"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter Employee ID"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">New Salary</label>
                    <input
                        type="number"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter New Salary"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Update Salary
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployeeSalary;
