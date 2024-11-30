import React from "react";
import loginimg from "../images/loginimg.png";
import applogo from "../images/applogo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {

    let [name, setName] = useState();
    let [password, setPassword] = useState();
    let [role, setRole] = useState();

    const [error, setError] = useState(null);

    const signup = () => {
        let data = { username: name, password, role };
        axios
            .post("http://localhost:8080/api/register", data)
            .then((response) => {
                alert("User registered successfully");
            })
            .catch((error) => {
                console.log(error); // Log any errors for troubleshooting
                alert("Error registering user: " + error.message);
            });

    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white border-gray-200 bg-white border-gray-200 fixed top-0 w-full bg-white shadow-md z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://easypay.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={applogo} className="h-8" alt="EasyPay Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap" style={{ color: "black" }}>EasyPay</span>
                    </a>
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


            {/* Signup */}
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10" style={{ backgroundColor: "#C0ECE4" }}>
                <div className="mt-16 flex shadow-xl bg-white rounded-2xl p-2">
                    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white p-8" style={{ width: '24rem', height: '34rem' }}>
                        <div className="w-72">
                            <h1 className="text-2xl font-bold text-center mb-5">Create your account</h1>

                            {/* <div className="flex justify-center space-x-4 mb-5">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">Admin</button>
                                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700">Employee</button>
                            </div> */}

                            <form className="mt-4">
                                <div className="mb-5">
                                    <label className="mb-2 block text-left text-xm font-semibold">Full name</label>
                                    <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500" />
                                </div>

                                {/* <div className="mb-5">
                                    <label className="mb-2 block text-left text-xm font-semibold">Email</label>
                                    <input type="email" placeholder="Enter your email" onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500" />
                                </div> */}

                                <div className="mb-5">
                                    <label className="mb-2 block text-left text-xm font-semibold">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500" />
                                </div>

                                <div className="mb-5">
                                    <label className="mb-2 block text-left text-xm font-semibold">Role</label>
                                    <input type="text" placeholder="Enter your role" onChange={(e) => setRole(e.target.value)} className="block w-full rounded-md border border-gray-300 focus:border-custom-border focus:outline-none focus:ring-1 focus:ring-custom-border py-1 px-1.5 text-gray-500" />
                                </div>

                                <div className="mb-3">
                                    <button className="mb-2 block w-full text-center text-white hover:bg-purple-900 px-2 py-1.5 rounded-md" style={{ backgroundColor: "#80D4CC" }} onClick={signup}>Sign up</button>
                                    <button className="flex flex-wrap justify-center w-full border border-gray-300 font-semibold hover:border-gray-500 px-2 py-1.5 rounded-md">
                                        <img className="w-6 h-6 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google logo" />
                                        Sign up with Google
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <span className="text-xs text-gray-400 font-semibold">Already have an account?</span>
                                <Link to="/login" className="text-xs font-semibold" style={{ color: "#2C44D4" }}> Sign in</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '34rem' }}>
                        <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src={loginimg} alt="Background" />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Signup;
