import React, { useState } from 'react';
import Logout from './Logout';
import Dashboard from '../admin/Dashboard';
import GetAllUserData from '../admin/GetAllUserData';
import GetAllEmployees from '../admin/GetAllEmployees';
import UpdateUser from '../admin/UpdateUser';

const AdminDashboard = () => {
    const [activeDashboard, setActiveDashboard] = useState('dashboard');

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="min-h-screen w-64 bg-gray-900 text-white">
                <div className="p-6 text-lg font-bold flex items-center">
                    <span className="mr-2">📊</span> Admin
                </div>
                <ul>
                    <li
                        onClick={() => setActiveDashboard('dashboard')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center"
                    >
                        <span className="mr-2">📊</span> Dashboard
                    </li>

                    <li
                        onClick={() => setActiveDashboard('getallusers')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center"
                    >
                        <span className="mr-2">📊</span> All users data

                    </li>
                    <li
                        onClick={() => setActiveDashboard('getallemployees')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center"
                    >
                        <span className="mr-2">📊</span> All employees data

                    </li>
                    <li
                        onClick={() => setActiveDashboard('updateuser')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center"
                    >
                        <span className="mr-2">📊</span> Update user

                    </li>
                    {/* <li
                        onClick={() => setActiveDashboard('stocks')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center"
                    >
                        <span>Stocks</span>

                    </li> */}
                    <Logout />
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                {/* Default Dashboard */}
                {activeDashboard === 'dashboard' && (
                    <div>
                        <Dashboard />
                    </div>
                )}

                {/* Analytics */}
                {activeDashboard === 'getallusers' && (
                    <GetAllUserData />
                )}

                {/* Marketing */}
                {activeDashboard === 'getallemployees' && (
                    <div>
                        <GetAllEmployees />
                    </div>
                )}

                {/* CRM */}
                {activeDashboard === 'updateuser' && (
                    <div>
                        <UpdateUser />
                    </div>
                )}

                {/* Stocks */}
                {activeDashboard === 'stocks' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Stocks Dashboard</h1>
                        <p>Track stock performance here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
