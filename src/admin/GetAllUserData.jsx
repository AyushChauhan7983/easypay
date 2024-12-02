import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const GetAllUserData = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let nav = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            nav("/login");
            return;
        }

        axios
            .get("http://localhost:8080/api/admin_getUserData", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    setError("Token expired or invalid. Please log in again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    sessionStorage.removeItem("flag");
                    nav("/login");

                } else {
                    setError("Error fetching users data");
                }
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-5">Users Data</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left border-b">UserID</th>
                        <th className="px-4 py-2 text-left border-b">Username</th>
                        <th className="px-4 py-2 text-left border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{user.userId}</td>
                            <td className="px-4 py-2 border-b">{user.username}</td>
                            <td className="px-4 py-2 border-b">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetAllUserData;
