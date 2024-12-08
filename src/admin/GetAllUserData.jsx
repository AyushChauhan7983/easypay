import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // React Icons for delete
import { message, Modal } from "antd"; // Ant Design Modal for confirmation
import Signup from "../components/Signup";

const GetAllUserData = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            navigate("/login");
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
                if (err.response?.status === 403) {
                    setError("Token expired or invalid. Please log in again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    sessionStorage.removeItem("flag");
                    navigate("/login");
                } else {
                    setError("Error fetching user data.");
                }
                setLoading(false);
            });
    };

    const handleDelete = () => {
        const token = localStorage.getItem("token");
        axios
            .delete(`http://localhost:8080/api/admin_removeUser/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                message.success("User deleted successfully.");
                setUsers(users.filter((user) => user.userId !== selectedUserId));
                closeModal();
            })
            .catch((err) => {
                if (err.response?.status === 404) {
                    message.error("User not found.");
                } else {
                    message.error("Error deleting user.");
                }
                closeModal();
            });
    };

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto p-4">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">Users Data</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate("/signup")}
                >
                    Add new user
                </button>

            </div>

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left border-b">UserID</th>
                        <th className="px-4 py-2 text-left border-b">Username</th>
                        <th className="px-4 py-2 text-left border-b">Role</th>
                        <th className="px-4 py-2 text-left border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{user.userId}</td>
                            <td className="px-4 py-2 border-b">{user.username}</td>
                            <td className="px-4 py-2 border-b">{user.role}</td>
                            <td className="px-4 py-2 border-b">
                                <FaTrashAlt
                                    className="ml-3 text-red-500 hover:text-red-700 cursor-pointer"
                                    size={20}
                                    onClick={() => openModal(user.userId)}
                                    title="Delete User"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                title="Confirm Deletion"
                visible={isModalOpen}
                onOk={handleDelete}
                onCancel={closeModal}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </div>
    );
};

export default GetAllUserData;
