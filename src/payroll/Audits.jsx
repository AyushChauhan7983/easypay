import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const PayrollAuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setError('You are not authenticated. Please log in.');
            setLoading(false);
            return;
        }

        axios.get('http://localhost:8080/api/payroll/audit', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setAuditLogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the audit logs!", error);
                setError('Failed to load audit logs. Please try again later.');
                setLoading(false);
            });
    }, [token]);

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-red-600">{error}</span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4 text-gray-700">Payroll Audit Logs</h1>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Log ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditLogs.map((audit) => (
                            <tr key={audit.logId} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{audit.logId}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{audit.action}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{audit.user.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{new Date(audit.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollAuditLogs;
