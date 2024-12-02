import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("flag");

        navigate("/login");
    };

    return (
        <div className="flex justify-start p-4">
            <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
