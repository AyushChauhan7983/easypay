import React from 'react';
import { jsPDF } from 'jspdf';

const Modal = ({ isOpen, onClose, payrollData }) => {
    if (!isOpen) return null;

    const handleDownloadPayslip = () => {
        const doc = new jsPDF();
        const {
            payrollId,
            employee: { firstName, lastName, email, phoneNumber, department, salary, hireDate },
            payDate,
            basicSalary,
            bonuses,
            deductions,
            netSalary,
            hoursWorked,
        } = payrollData;

        // Add content to the PDF
        doc.setFontSize(16);
        doc.text('Payslip', 20, 20);
        doc.setFontSize(12);

        // Add payroll data
        doc.text(`Payroll ID: ${payrollId}`, 20, 30);
        doc.text(`Employee: ${firstName} ${lastName}`, 20, 40);
        doc.text(`Email: ${email}`, 20, 50);
        doc.text(`Phone Number: ${phoneNumber}`, 20, 60);
        doc.text(`Department: ${department.deptName}`, 20, 70);
        doc.text(`Salary: ${salary}`, 20, 80);
        doc.text(`Hire Date: ${new Date(hireDate).toLocaleDateString()}`, 20, 90);
        doc.text(`Pay Date: ${new Date(payDate).toLocaleDateString()}`, 20, 100);
        doc.text(`Basic Salary: ${basicSalary}`, 20, 110);
        doc.text(`Bonuses: ${bonuses}`, 20, 120);
        doc.text(`Deductions: ${deductions}`, 20, 130);
        doc.text(`Net Salary: ${netSalary}`, 20, 140);
        doc.text(`Hours Worked: ${hoursWorked}`, 20, 150);

        // Save the PDF
        doc.save('payslip.pdf');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                {/* Download Button */}
                <button
                    onClick={handleDownloadPayslip}
                    className="mt-3 absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                >
                    Download PDF
                </button>

                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payroll Details</h2>
                <div>
                    <p><strong>Payroll ID:</strong> {payrollData.payrollId}</p>
                    <p><strong>Employee:</strong> {payrollData.employee.firstName} {payrollData.employee.lastName}</p>
                    <p><strong>Email:</strong> {payrollData.employee.email}</p>
                    <p><strong>Phone Number:</strong> {payrollData.employee.phoneNumber}</p>
                    <p><strong>Department:</strong> {payrollData.employee.department.deptName}</p>
                    <p><strong>Salary:</strong> {payrollData.employee.salary}</p>
                    <p><strong>Hire Date:</strong> {new Date(payrollData.employee.hireDate).toLocaleDateString()}</p>
                    <p><strong>Pay Date:</strong> {new Date(payrollData.payDate).toLocaleDateString()}</p>
                    <p><strong>Basic Salary:</strong> {payrollData.basicSalary}</p>
                    <p><strong>Bonuses:</strong> {payrollData.bonuses}</p>
                    <p><strong>Deductions:</strong> {payrollData.deductions}</p>
                    <p><strong>Net Salary:</strong> {payrollData.netSalary}</p>
                    <p><strong>Hours Worked:</strong> {payrollData.hoursWorked}</p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
