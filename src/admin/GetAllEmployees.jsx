import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import AddEmployee from "./AddEmpDetails";
import { Modal, Button } from "antd";

const GetAllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Departments mapping
    const departments = [
        { id: 1, name: "HR" },
        { id: 2, name: "Finance" },
        { id: 3, name: "Developer" },
        { id: 4, name: "IT" },
        { id: 5, name: "Sales" },
    ];

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
        }

        axios
            .get("http://localhost:8080/api/admin_getAllEmployees", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    setError("Token expired or invalid. Please log in again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    sessionStorage.removeItem("flag");
                } else {
                    setError("Error fetching employee data.");
                }
                setLoading(false);
            });
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleEmployeeAdded = () => {
        fetchEmployees(); // Refresh the employee list after adding a new employee
        handleModalClose();
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto p-4">
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <h2 className="text-2xl font-bold mb-5">Employees Data</h2>

                <Button
                    type="primary"
                    onClick={handleModalOpen}
                    className="mb-4 bg-blue-500 hover:bg-blue-600"
                >
                    Add Employee
                </Button>
            </div>

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left border-b">Employee ID</th>
                        <th className="px-4 py-2 text-left border-b">First Name</th>
                        <th className="px-4 py-2 text-left border-b">Last Name</th>
                        <th className="px-4 py-2 text-left border-b">Email</th>
                        <th className="px-4 py-2 text-left border-b">Phone</th>
                        <th className="px-4 py-2 text-left border-b">Hire Date</th>
                        <th className="px-4 py-2 text-left border-b">Salary</th>
                        <th className="px-4 py-2 text-left border-b">Department</th> {/* Updated column name */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        // Find the department name based on departmentId
                        const department = departments.find(dept => dept.id === employee.departmentId);
                        const departmentName = department ? department.name : "Unknown"; // Default to "Unknown" if no match

                        return (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b">{employee.empId}</td>
                                <td className="px-4 py-2 border-b">{employee.firstName}</td>
                                <td className="px-4 py-2 border-b">{employee.lastName}</td>
                                <td className="px-4 py-2 border-b">{employee.email}</td>
                                <td className="px-4 py-2 border-b">{employee.phoneNumber}</td>
                                <td className="px-4 py-2 border-b">
                                    {new Date(employee.hireDate).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border-b">{employee.salary}</td>
                                <td className="px-4 py-2 border-b">{departmentName}</td> {/* Show department name */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal for adding employees */}
            <Modal
                title="Add Employee"
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
            >
                <AddEmployee onEmployeeAdded={handleEmployeeAdded} />
            </Modal>
        </div>
    );
};

export default GetAllEmployees;
