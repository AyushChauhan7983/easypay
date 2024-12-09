import React, { useState } from "react";
import loginimg from "../images/loginimg.png";
import applogo from "../images/applogo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import icons from react-icons
import { FaArrowLeft } from "react-icons/fa";  // Import back arrow icon

const Signup = () => {
    let [name, setName] = useState();
    let [password, setPassword] = useState();
    let [role, setRole] = useState();
    let [loading, setLoading] = useState(false);
    let [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    let nav = useNavigate();

    const signup = () => {
        setLoading(true);
        let data = { username: name, password, role };
        axios
            .post("http://localhost:8080/api/register", data)
            .then(() => {
                setLoading(false);
                message.success("Signed up successfully");
                setTimeout(() => {
                    nav("/admin");
                }, 1000);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                message.error("Use different name");
            });
    };

    return (
        <>
            {/* Back Button */}
            <div className="absolute top-5 left-5 z-50">
                <button
                    onClick={() => nav("/admin")}
                    className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition duration-300"
                >
                    <FaArrowLeft size={20} />
                </button>
            </div>

            {/* Signup */}
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10" style={{ backgroundColor: "#C0ECE4" }}>
                {loading ? (<Spinner />) : (
                    <div className="flex shadow-xl bg-white rounded-2xl p-2">
                        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white p-8" style={{ width: '24rem', height: '30rem' }}>
                            <div className="w-72">
                                <h1 className="text-2xl font-bold text-center mb-5">Create a new user</h1>

                                <form className="mt-4">
                                    <div className="mb-5">
                                        <label className="mb-2 block text-left text-xm font-semibold">Full name</label>
                                        <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500" />
                                    </div>

                                    <div className="mb-5">
                                        <label className="mb-2 block text-left text-xm font-semibold">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                            >
                                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label className="mb-2 block text-left text-xm font-semibold">Role</label>
                                        <select
                                            className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500"
                                            onChange={(e) => setRole(e.target.value)}
                                            value={role}
                                        >
                                            <option value="">Select your role</option>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="EMPLOYEE">EMPLOYEE</option>
                                            <option value="PAYROLL_MANAGER">PAYROLL MANAGER</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <button
                                            type="button"
                                            className="mb-2 block w-full text-center text-white bg-[#0bbed4] hover:bg-[#0c9aac] px-2 py-1.5 rounded-md"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                signup();
                                            }}
                                        >
                                            Create account
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '30rem' }}>
                            <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src={loginimg} alt="Background" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Signup;
