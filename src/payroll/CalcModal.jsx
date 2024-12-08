import React, { useState } from 'react';
import axios from 'axios';
import CalcModal from './CalcModal'; // Import the modal component

const PayrollCalculation = () => {
    const [payrollData, setPayrollData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(""); // Assuming employeeId is required for the calculation

    const token = localStorage.getItem('token');  // Token for Authorization
    const headers = { Authorization: `Bearer ${token}` };

    const handlePayrollCalculation = async () => {
        try {
            // Assuming you have payrollDTO data to send
            const payrollDTO = {
                employeeId: employeeId, // Add any additional required data for the calculation
                hoursWorked: 120, // Example static value
                // other fields...
            };

            const response = await axios.post(
                '/payroll/calculate_payroll',
                payrollDTO,
                { headers }
            );

            setPayrollData(response.data); // Set the response data to show in the modal
            setIsModalOpen(true);  // Open the modal
        } catch (error) {
            console.error("Error calculating payroll:", error);
        }
    };

    return (
        <div className="flex justify-center items-center p-6">
            <div>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Enter Employee ID"
                    className="border-2 border-gray-400 p-2 rounded-lg"
                />
                <button
                    onClick={handlePayrollCalculation}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Calculate Payroll
                </button>
            </div>

            {/* Modal */}
            <CalcModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                payrollData={payrollData}
            />
        </div>
    );
};

export default PayrollCalculation;
