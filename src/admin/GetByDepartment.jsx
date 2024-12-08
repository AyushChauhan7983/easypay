import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const EmployeeListByDepartment = () => {
    const [departmentId, setDepartmentId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    // Manual mapping of departments
    const departments = [
        { dept_id: 1, dept_name: "HR" },
        { dept_id: 2, dept_name: "Finance" },
        { dept_id: 3, dept_name: "Developer" },
        { dept_id: 4, dept_name: "IT" },
        { dept_id: 5, dept_name: "Sales" },
    ];

    // Fetch employees by selected department ID
    const fetchEmployees = () => {
        setError("");
        if (!departmentId) {
            setError("Please select a department.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        axios
            .get(`http://localhost:8080/api/admin_getEmployeesByDepartment/${departmentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setEmployees(res.data);
                message.success("Employees fetched successfully.");
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("No employees found in this department.");
                    setEmployees([]);
                } else {
                    setError("Failed to fetch employees. Please try again.");
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Employees by Department</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Department Dropdown Section */}
            <div className="mb-6">
                <label className="block font-medium">Select Department</label>
                <div className="flex items-center space-x-4 mt-2">
                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="flex-grow p-2 border rounded"
                    >
                        <option value="">-- Select a Department --</option>
                        {departments.map((department) => (
                            <option key={department.dept_id} value={department.dept_id}>
                                {department.dept_name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={fetchEmployees}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Fetch Employees
                    </button>
                </div>
            </div>

            {/* Employee List Section */}
            {employees.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Employee List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border p-2">Employee ID</th>
                                    <th className="border p-2">Firstname</th>
                                    <th className="border p-2">Lastname</th>
                                    <th className="border p-2">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td className="border p-2 text-center">{employee.empId}</td>
                                        <td className="border p-2 text-center">{employee.firstName}</td>
                                        <td className="border p-2 text-center">{employee.lastName}</td>
                                        <td className="border p-2 text-center">{employee.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeListByDepartment;
