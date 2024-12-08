import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const CalculatePayroll = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    hoursWorked: '',
    payDate: '',
  });
  const [payrollData, setPayrollData] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const handleCalculatePayroll = () => {
    // Basic validation for empty fields
    if (!formData.employeeId || !formData.hoursWorked || !formData.payDate) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    axios
      .post('http://localhost:8080/api/payroll/calculate_payroll', formData, { headers })
      .then((res) => {
        setPayrollData(res.data);
        message.success('Payroll calculated successfully.');
        setIsLoading(false);
        setFormData({ employeeId: '', hoursWorked: '', payDate: '' })
      })
      .catch(() => {
        setError('Error calculating payroll.');
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Calculate Payroll</h2>

      {/* Payroll Calculation Form */}
      <form className="space-y-4">
        {/* Employee ID Input */}
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-600">
            Employee ID
          </label>
          <input
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter Employee ID"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Hours Worked Input */}
        <div>
          <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-600">
            Working Hours
          </label>
          <input
            id="hoursWorked"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleChange}
            placeholder="Enter Working Hours"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Pay Date Input */}
        <div>
          <label htmlFor="payDate" className="block text-sm font-medium text-gray-600">
            Pay Date
          </label>
          <input
            id="payDate"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            type="date"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleCalculatePayroll}
          disabled={isLoading}
          className={`w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Calculating...' : 'Calculate Payroll'}
        </button>
      </form>

      {/* Display Payroll Data in Modal if Calculated */}
      {payrollData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Calculated Payroll</h3>
            <div className="mb-2">
              <strong>Employee Name: </strong>
              {`${payrollData.employee.firstName} ${payrollData.employee.lastName}`}
            </div>
            <div className="mb-2">
              <strong>Employee ID: </strong>
              {payrollData.employee.empId}
            </div>
            <div className="mb-2">
              <strong>Pay Date: </strong>
              {new Date(payrollData.payDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>Basic Salary: </strong>
              {payrollData.basicSalary}
            </div>
            <div className="mb-2">
              <strong>Bonuses: </strong>
              {payrollData.bonuses}
            </div>
            <div className="mb-2">
              <strong>Deductions: </strong>
              {payrollData.deductions}
            </div>
            <div className="mb-2">
              <strong>Net Salary: </strong>
              {payrollData.netSalary}
            </div>
            <div className="mb-2">
              <strong>Hours Worked: </strong>
              {payrollData.hoursWorked}
            </div>
            <button
              onClick={() => setPayrollData(null)} // Close modal
              className="mt-4 w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Display error message */}
      {error && <div className="flex justify-center text-red-500 mt-4 mb-4">{error}</div>}
    </div>
  );
};

export default CalculatePayroll;
