import React, { useState } from 'react';
import CalculatePayroll from '../payroll/CalculatePayroll';
import UpdatePayroll from '../payroll/UpdatePayroll';
import FetchPayrollByEmployeeId from '../payroll/FetchPayrollByEmployeeId';
import HolidayCalendarModal from '../widget/Calendar';
import PayrollAuditLogs from '../payroll/Audits';
import { FaCalculator, FaUser, FaEdit, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import Logout from './Logout';
import { useLocation } from 'react-router-dom';

const PayrollDashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState('default_dashboard');
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const location = useLocation();
  const username = location.state?.username || 'Payroll Manager';

  const renderForm = () => {
    switch (activeDashboard) {
      case 'update_payroll':
        return <UpdatePayroll />;
      case 'fetch_by_employee':
        return <FetchPayrollByEmployeeId />;
      case 'audit_logs':
        return <PayrollAuditLogs />;
      default:
        return <CalculatePayroll />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out">
        <div className="p-6 text-lg font-bold flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <span className="mr-2 text-xl"><FaUser className="text-xl" /></span> {username}
          </div>
          {/* Calendar Icon */}
          <button
            onClick={() => setIsCalendarModalOpen(true)}
            className="text-xl hover:text-blue-400 transition duration-200"
            aria-label="Open Calendar"
          >
            <FaCalendarAlt />
          </button>
        </div>
        <ul className="mt-6">
          {/* Calculate Payroll */}
          <li
            onClick={() => setActiveDashboard('calculate_payroll')}
            className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'calculate_payroll' ? 'bg-gray-800' : ''}`}
          >
            <FaCalculator className="mr-3" />
            Calculate Payroll
          </li>
          {/* Fetch Payroll by Employee ID */}
          <li
            onClick={() => setActiveDashboard('fetch_by_employee')}
            className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'fetch_by_employee' ? 'bg-gray-800' : ''}`}
          >
            <FaUser className="mr-3" />
            Fetch Payroll
          </li>

          {/* Update Payroll */}
          <li
            onClick={() => setActiveDashboard('update_payroll')}
            className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'update_payroll' ? 'bg-gray-800' : ''}`}
          >
            <FaEdit className="mr-3" />
            Update Payroll
          </li>

          {/* Audit Logs */}
          <li
            onClick={() => setActiveDashboard('audit_logs')}
            className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'audit_logs' ? 'bg-gray-800' : ''}`}
          >
            <FaHistory className="mr-3" />
            Audit Logs
          </li>
        </ul>
        <Logout />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-hidden transition-all duration-300 ease-in-out">
        {renderForm()}
      </div>

      {isCalendarModalOpen && (
        <HolidayCalendarModal onClose={() => setIsCalendarModalOpen(false)} />
      )}
    </div>
  );
};

export default PayrollDashboard;
