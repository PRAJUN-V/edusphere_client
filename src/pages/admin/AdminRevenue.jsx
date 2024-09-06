import React, { useEffect, useState } from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import Footer from '../user/common/Footer';

export const AdminRevenue = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [overallCommission, setOverallCommission] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch('https://edusphere.duckdns.org/api/admin/revenue/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('API Response:', data);

                if (Array.isArray(data)) {
                    setRevenueData(data);

                    // Calculate overall commission based on total revenue
                    const totalRevenue = data.reduce((sum, item) => sum + (item.total_revenue || 0), 0);
                    const totalCommission = totalRevenue * 0.10;
                    setOverallCommission(totalCommission);
                } else {
                    throw new Error('Invalid data structure');
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRevenueData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <div className="p-4 flex-grow">
                        <h2 className="text-2xl font-bold mb-4">Admin Revenue Overview</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission (10% of Total Revenue)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {revenueData.length > 0 ? (
                                    revenueData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.instructor_username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.total_revenue.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.total_revenue * 0.10).toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="mt-4 text-lg font-bold">
                            <p>Overall Commission: ${overallCommission.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminRevenue;
