import React from "react";
import applogo from "../images/applogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50 bg-white border-gray-200">
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
                    {/* Login and Signup Buttons */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Login</Link>
                        {/* <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">Signup</Link> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;