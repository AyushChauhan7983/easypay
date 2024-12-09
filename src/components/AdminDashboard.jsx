import React, { useState } from 'react';
import Logout from './Logout';
import Dashboard from '../admin/Dashboard';
import GetAllEmployees from '../admin/GetAllEmployees';
import UpdateUser from '../admin/UpdateUser';
import UpdateEmployeeSalary from '../admin/UpdateSalary';
import LeaveManagement from '../admin/Leaves';
import EmployeeListByDepartment from '../admin/GetByDepartment';
import HolidayCalendarModal from '../widget/Calendar';
import { useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserEdit, FaMoneyBillWaveAlt, FaLeaf, FaBuilding, FaUser, FaCalendarAlt } from 'react-icons/fa'; // Import professional icons
import ChangeDepartment from '../admin/ChangeDepartment';

const AdminDashboard = () => {
    const [activeDashboard, setActiveDashboard] = useState('dashboard');
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const location = useLocation();
    const username = location.state?.username || 'Admin';

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="min-h-screen w-64 bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out">
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
                    {/* Dashboard Link */}
                    <li
                        onClick={() => setActiveDashboard('dashboard')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'dashboard' ? 'bg-gray-800' : ''}`}
                    >
                        <FaTachometerAlt className="mr-3 text-xl" /> Dashboard
                    </li>

                    {/* All Employees Data Link */}
                    <li
                        onClick={() => setActiveDashboard('getallemployees')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'getallemployees' ? 'bg-gray-800' : ''}`}
                    >
                        <FaUsers className="mr-3 text-xl" /> All Employees Data
                    </li>

                    {/* Update User Link */}
                    <li
                        onClick={() => setActiveDashboard('updateuser')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'updateuser' ? 'bg-gray-800' : ''}`}
                    >
                        <FaUserEdit className="mr-3 text-xl" /> Update User
                    </li>

                    {/* Update Salary Link */}
                    <li
                        onClick={() => setActiveDashboard('updatesalary')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'updatesalary' ? 'bg-gray-800' : ''}`}
                    >
                        <FaMoneyBillWaveAlt className="mr-3 text-xl" /> Update Salary
                    </li>

                    {/* ChangeDepartment */}
                    <li
                        onClick={() => setActiveDashboard('changedepartment')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'changedepartment' ? 'bg-gray-800' : ''}`}
                    >
                        <FaBuilding className="mr-3 text-xl" /> Change Department
                    </li>

                    {/* Leave Management Link */}
                    <li
                        onClick={() => setActiveDashboard('leaves')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'leaves' ? 'bg-gray-800' : ''}`}
                    >
                        <FaLeaf className="mr-3 text-xl" /> Leave Management
                    </li>

                    {/* Department-wise Employee List Link */}
                    <li
                        onClick={() => setActiveDashboard('getbydept')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'getbydept' ? 'bg-gray-800' : ''}`}
                    >
                        <FaUsers className="mr-3 text-xl" /> Employees by Department
                    </li>

                    {/* Logout Button */}
                    <li className="mt-2">
                        <Logout />
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 overflow-hidden transition-all duration-300 ease-in-out">
                {activeDashboard === 'dashboard' && <Dashboard />}
                {activeDashboard === 'getallemployees' && <GetAllEmployees />}
                {activeDashboard === 'updateuser' && <UpdateUser />}
                {activeDashboard === 'updatesalary' && <UpdateEmployeeSalary />}
                {activeDashboard === 'changedepartment' && <ChangeDepartment />}
                {activeDashboard === 'leaves' && <LeaveManagement />}
                {activeDashboard === 'getbydept' && <EmployeeListByDepartment />}
            </div>

            {/* Holiday Calendar Modal */}
            {isCalendarModalOpen && (
                <HolidayCalendarModal
                    onClose={() => setIsCalendarModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
