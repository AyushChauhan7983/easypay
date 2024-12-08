import { useEffect, useState } from "react";
import axios from "axios";
import GetAllUserData from "./GetAllUserData";

const Dashboard = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalPayrollManagers, setTotalPayrollManagers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. User not authenticated.");
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        axios
            .get("http://localhost:8080/api/admin_total_employees", { headers })
            .then((res) => setTotalEmployees(res.data))
            .catch((err) => {
                console.error("Error fetching total employees:", err);
                if (err.response && err.response.status === 403) {
                    console.error("Access denied. Check your permissions or token.");
                }
            });

        axios
            .get("http://localhost:8080/api/admin_total_payroll_manager", { headers })
            .then((res) => setTotalPayrollManagers(res.data))
            .catch((err) => {
                console.error("Error fetching total payroll managers:", err);
                if (err.response && err.response.status === 403) {
                    console.error("Access denied. Check your permissions or token.");
                }
            });

        axios
            .get("http://localhost:8080/api/admin_total_admin", { headers })
            .then((res) => setTotalAdmins(res.data))
            .catch((err) => {
                console.error("Error fetching total admins:", err);
                if (err.response && err.response.status === 403) {
                    console.error("Access denied. Check your permissions or token.");
                }
            });
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h3 className="text-lg font-semibold">Total Admins</h3>
                    <p className="text-2xl font-bold">{totalAdmins}</p>
                </div>
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h3 className="text-lg font-semibold">Total Employees</h3>
                    <p className="text-2xl font-bold">{totalEmployees}</p>
                </div>
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h3 className="text-lg font-semibold">Total Payroll Managers</h3>
                    <p className="text-2xl font-bold">{totalPayrollManagers}</p>
                </div>
            </div>
            <GetAllUserData />
        </>
    );
};

export default Dashboard;
