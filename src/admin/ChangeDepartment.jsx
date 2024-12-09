import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const ChangeDepartment = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

    const departments = [
        { id: 1, name: "HR" },
        { id: 2, name: "Finance" },
        { id: 3, name: "Developer" },
        { id: 4, name: "IT" },
        { id: 5, name: "Sales" },
    ];

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const handleSubmit = async () => {
        if (!employeeId || !selectedDepartmentId) {
            alert("Please enter an employee ID and select a department.");
            return;
        }

        const token = getToken();
        if (!token) {
            message.error("Authentication token not found. Please log in.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/admin_update_department/${employeeId}?departmentId=${selectedDepartmentId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            message.success("Department updated successfully");
            setEmployeeId("");
            setSelectedDepartmentId("");
        } catch (error) {
            console.error("Error updating department:", error);
            if (error.response?.status === 403) {
                message.error("You do not have permission to update the department.");
            } else {
                message.error("Error updating department");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-md shadow-md w-96 mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Change Department</h2>
            <div className="mb-4">
                <label htmlFor="employeeId" className="block font-medium">
                    Employee ID:
                </label>
                <input
                    type="number"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Enter Employee ID"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="department" className="block font-medium">
                    Department:
                </label>
                <select
                    id="department"
                    value={selectedDepartmentId}
                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                >
                    <option value="">Select a Department</option>
                    {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Update Department
            </button>
        </div>
    );
};

export default ChangeDepartment;
