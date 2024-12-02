import React, { useState } from 'react';
import Employee from '../employee/EmployeeProfile';
import EmployeeUpdate from '../employee/EmployeeUpdate';
import LeaveRequest from '../employee/EmployeeLeave';
import Logout from './Logout';

const EmployeeDashboard = () => {
    const [activeDashboard, setActiveDashboard] = useState('view_profile_emp');

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="min-h-screen w-64 bg-gray-900 text-white">
                <div className="p-6 text-lg font-bold flex items-center">
                    Employee Dashboard
                </div>
                <ul>
                    <li
                        onClick={() => setActiveDashboard('view_profile_emp')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>View Profile</span>

                    </li>
                    <li
                        onClick={() => setActiveDashboard('update_profile_emp')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>Edit Details</span>

                    </li>
                    <li
                        onClick={() => setActiveDashboard('submit_leave_req')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>Submit Leave Request</span>

                    </li>
                </ul>
                <Logout />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">

                {/* View profile */}
                {activeDashboard === 'view_profile_emp' && (
                    <div>
                        <Employee />

                    </div>
                )}

                {/* Update Profile */}
                {activeDashboard === 'update_profile_emp' && (
                    <div>
                        <EmployeeUpdate />
                    </div>
                )}

                {/* Submit Leave Request */}
                {activeDashboard === 'submit_leave_req' && (
                    <div>
                        <LeaveRequest />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;