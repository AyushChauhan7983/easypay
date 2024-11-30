import React from "react";
import Navbar from "../widget/Navbar";
import about1 from "../images/about1.jpg";
import about2 from "../images/about2.jpg";
import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div style={{ backgroundColor: "#e4f9fc", minHeight: "110vh" }}>
                <Navbar />
                <div class="flex flex-col items-center max-w-screen-xl mx-auto space-y-10 sm:space-y-0">

                    <div class="sm:flex items-center max-w-screen-xl w-full">
                        <div class="sm:w-1/2 p-10">
                            <div class="image object-center text-center">
                                <img src={about1} alt="About Us" class="mx-auto" />
                            </div>
                        </div>
                        <div class="sm:w-1/2 p-5">
                            <div class="text text-center sm:text-left">
                                <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">Who we are</span>
                                <h2 class="my-4 font-bold text-3xl sm:text-4xl">
                                    Who we are
                                </h2>
                                <p class="text-gray-700">
                                    At EasyPay, we are dedicated to revolutionizing payroll management. As a trusted partner in the payroll industry, we strive to simplify and streamline payroll processes for businesses of all sizes. Our team of experts is committed to providing accurate, timely, and hassle-free payroll solutions, ensuring that employees are paid correctly and on time, every time. With a focus on efficiency, security, and compliance, EasyPay empowers companies to focus on what matters most—growing their business—while we take care of their payroll needs.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="sm:flex items-center max-w-screen-xl w-full ml-24">
                        <div class="sm:w-1/2 p-5">
                            <div class="text text-center sm:text-left">
                                <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">Why us</span>
                                <h2 class="my-4 font-bold text-3xl sm:text-4xl">
                                    Why us
                                </h2>
                                <p class="text-gray-700">
                                    At EasyPay, we are dedicated to providing businesses with accurate, timely, and compliant payroll management solutions. With a focus on minimizing errors and ensuring on-time payments, we help you keep your employees satisfied while avoiding costly mistakes. Our team stays ahead of the latest tax laws and regulations, offering businesses peace of mind with our compliance expertise. Whether you're a small startup or a large enterprise, EasyPay offers scalable solutions that grow with your business needs. We prioritize data security by utilizing advanced encryption and secure systems, protecting your sensitive payroll information. With our cost-effective solutions and expert support, EasyPay simplifies the payroll process, allowing you to focus on what truly matters—growing your business.
                                </p>
                            </div>
                        </div>
                        <div class="sm:w-1/2 p-10">
                            <div class="image object-center text-center">
                                <img src={about2} alt="About Us" class="mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
