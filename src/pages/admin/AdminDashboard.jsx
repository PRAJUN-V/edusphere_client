import React, { useEffect, useState } from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import Footer from '../user/common/Footer';
import TopInstructors from '../user/common/TopInstructors';
import AdminRecentlyAddedCourses from './common/AdminRecentlyAddedCourses';
import * as XLSX from 'xlsx';  // Import xlsx

export const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [courseStats, setCourseStats] = useState([]);

    // Fetch dashboard data
    useEffect(() => {
        fetch('https://edusphere.duckdns.org/dashboard/admin')
            .then(response => response.json())
            .then(data => setDashboardData(data))
            .catch(error => console.error('Error fetching dashboard data:', error));
    }, []);

    // Fetch course stats data
    useEffect(() => {
        fetch('https://edusphere.duckdns.org/dashboard/admin/course-stat')
            .then(response => response.json())
            .then(data => setCourseStats(data))
            .catch(error => console.error('Error fetching course stats:', error));
    }, []);

    // Function to export course stats to an Excel file with admin revenue
    const createReport = () => {
        // Create a new array with additional admin revenue data
        const courseStatsWithAdminRevenue = courseStats.map(course => ({
            course: course.title,
            category: course.category,
            number_of_sales: course.number_of_sales,
            total_earnings: course.total_earnings.toFixed(2),
            admin_revenue: (course.total_earnings * 0.1).toFixed(2),  // 10% of total earnings
        }));

        // Calculate the total admin revenue
        const totalAdminRevenue = courseStatsWithAdminRevenue.reduce((acc, course) => acc + parseFloat(course.admin_revenue), 0);

        // Append a final row for the total admin revenue
        courseStatsWithAdminRevenue.push({
            course: 'Total',
            category: '',
            number_of_sales: '',
            total_earnings: '',
            admin_revenue: totalAdminRevenue.toFixed(2),
        });

        // Convert to worksheet
        const ws = XLSX.utils.json_to_sheet(courseStatsWithAdminRevenue);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Course Status");

        // Generate Excel file and trigger download
        XLSX.writeFile(wb, "sale_report.xlsx");
    };

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <div className="p-4 flex flex-col space-y-4">
                        {/* Dashboard Header with Button */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold">Overview</h1>
                            <button 
                                onClick={createReport}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Sales Report
                            </button>
                        </div>
                        
                        {/* Show a loading state until the data is available */}
                        {dashboardData ? (
                            <>
                                <div className="flex space-x-8">
                                    <div className="bg-gradient-to-r from-blue-400 to-gray-400 text-white p-6 rounded-lg shadow-lg flex-1 text-center">
                                        <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
                                        <div className="text-2xl">${dashboardData.total_revenue}</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-400 to-gray-400 text-white p-6 rounded-lg shadow-lg flex-1 text-center">
                                        <h3 className="text-xl font-semibold mb-2">Total Instructors</h3>
                                        <div className="text-2xl">{dashboardData.total_instructors}</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-400 to-gray-400 text-white p-6 rounded-lg shadow-lg flex-1 text-center">
                                        <h3 className="text-xl font-semibold mb-2">Total Students</h3>
                                        <div className="text-2xl">{dashboardData.total_students}</div>
                                    </div>
                                </div>

                                {/* Course Stats Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <tr>
                                                <th className="py-3 px-6 text-left">Course Title</th>
                                                <th className="py-3 px-6 text-left">Category</th>
                                                <th className="py-3 px-6 text-center">Number of Sales</th>
                                                <th className="py-3 px-6 text-center">Total Earnings</th>
                                                <th className="py-3 px-6 text-center">Revenue to Admin</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                            {courseStats.map((course, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{course.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <span>{course.category}</span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span>{course.number_of_sales}</span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span>${course.total_earnings.toFixed(2)}</span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span>${(course.total_earnings * 0.1).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <TopInstructors />
                                <AdminRecentlyAddedCourses />
                            </>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
