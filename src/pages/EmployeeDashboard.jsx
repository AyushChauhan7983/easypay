import React, { useState } from 'react';

const EmployeeDashboard = () => {
    const [activeDashboard, setActiveDashboard] = useState('dashboard');

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="min-h-screen w-64 bg-gray-900 text-white">
                <div className="p-6 text-lg font-bold flex items-center">
                    <span className="mr-2">📊</span> Employee
                </div>
                <ul>
                    <li
                        onClick={() => setActiveDashboard('dashboard')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center"
                    >
                        <span className="mr-2">📊</span> Dashboard
                    </li>

                    <li
                        onClick={() => setActiveDashboard('analytics')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>Analytics</span>

                    </li>
                    <li
                        onClick={() => setActiveDashboard('marketing')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>Marketing</span>

                    </li>
                    <li
                        onClick={() => setActiveDashboard('crm')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>CRM</span>

                    </li>
                    <li
                        onClick={() => setActiveDashboard('stocks')}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    >
                        <span>Stocks</span>

                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                {/* Default Dashboard */}
                {activeDashboard === 'dashboard' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                        <p>Welcome to the default dashboard!</p>
                    </div>
                )}

                {/* Analytics */}
                {activeDashboard === 'analytics' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
                        <p>Here are your analytics stats.</p>
                    </div>
                )}

                {/* Marketing */}
                {activeDashboard === 'marketing' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Marketing Dashboard</h1>
                        <p>Here are your marketing stats.</p>
                    </div>
                )}

                {/* CRM */}
                {activeDashboard === 'crm' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">CRM Dashboard</h1>
                        <p>Manage your customer relationships here.</p>
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

export default EmployeeDashboard;
