import React from "react";
import loginimg from "../images/loginimg.png";
import applogo from "../images/applogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { message } from 'antd';
import Spinner from "./Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

    let [name, setName] = useState();
    let [password, setPassword] = useState();
    let [loading, setLoading] = useState(false);
    let [showPassword, setShowPassword] = useState(false);

    let nav = useNavigate();

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        let data = { username: name, password };
        axios
            .post("http://localhost:8080/api/login", data)
            .then((res) => {
                setLoading(false);
                let token = res.data.jwt;
                let role = res.data.role;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                sessionStorage.setItem("flag", "true");
                message.success("Logged in successfully");

                if (role === "ADMIN") {
                    nav("/admin", { state: { username: name } });
                } else if (role === "EMPLOYEE") {
                    nav("/employee", { state: { username: name } });
                } else if (role === "PAYROLL_MANAGER") {
                    nav("/payroll", { state: { username: name } });
                } else {
                    nav("/login");
                }
            })
            .catch(() => {
                setLoading(false);
                message.error("Login failed. Please check your credentials.");
            });
    };


    return (
        <>
            {/* Navbar */}
            <nav className="bg-white border-gray-200 fixed top-0 w-full bg-white shadow-md z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={applogo} className="h-8" alt="EasyPay Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap" style={{ color: "black" }}>EasyPay</span>
                    </Link>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link to="/" className="block py-2 px-3 md:p-0 text-lg" style={{ color: "black", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = '#3B82F6'} onMouseLeave={e => e.target.style.color = 'black'}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="block py-2 px-3 md:p-0 text-lg" style={{ color: "black", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = '#3B82F6'} onMouseLeave={e => e.target.style.color = 'black'}>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block py-2 px-3 md:p-0 mr-10 text-lg" style={{ color: "black", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = '#3B82F6'} onMouseLeave={e => e.target.style.color = 'black'}>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* Login */}
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10" style={{ backgroundColor: "#C0ECE4" }}>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex shadow-xl bg-white rounded-2xl p-2">
                        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white p-8" style={{ width: '24rem', height: '26rem' }}>
                            <div className="w-72">
                                <h1 className="text-2xl font-bold text-center mb-5">Login to your account</h1>
                                <form className="mt-4">
                                    <div className="mb-5">
                                        <label className="mb-2 block text-left text-xm font-semibold">Username</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your username" className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500" />
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

                                    <button
                                        className="mb-2 block w-full text-center text-white bg-[#0bbed4] hover:bg-[#0c9aac] px-2 py-1.5 rounded-md"
                                        onClick={login}
                                    >
                                        Sign in
                                    </button>

                                    {/* <button
                                        type="button"
                                        className="flex flex-wrap justify-center w-full border border-gray-300 font-semibold hover:border-gray-500 px-2 py-1.5 rounded-md"
                                    >
                                        <img
                                            className="w-6 h-6 mr-2"
                                            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                                            alt="Google logo"
                                        />
                                        Sign in with Google
                                    </button> */}
                                </form>
                                {/* <div className="text-center mt-2">
                                    <span className="text-xs text-gray-400 font-semibold">Don't have an account?</span>
                                    <Link to="/signup" className="text-xs font-semibold" style={{ color: "#2C44D4" }}> Sign up</Link>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '26rem' }}>
                            <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src={loginimg} alt="Background" />
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}

export default Login;
