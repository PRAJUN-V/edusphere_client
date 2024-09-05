// src/components/RevenueInfo.js
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const fetchRevenueData = async (token) => { // Added token parameter
  try {
    const decodedToken = jwtDecode(token);
    const instructorId = decodedToken.user_id;
    const response = await fetch(`http://localhost:8000/api/instructor/revenue/${instructorId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch revenue data:', error);
    return { instructor_id: null, courses: [], total_revenue: 0 };
  }
};

export const RevenueInfo = () => {
  const [courses, setCourses] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [instructorId, setInstructorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('access'); // Or wherever you store the token

      if (token) {
        try {
          const data = await fetchRevenueData(token);
          setInstructorId(data.instructor_id);
          setCourses(data.courses);
          setTotalRevenue(data.total_revenue);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      } else {
        setError('Token not found');
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Revenue Information</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Purchases</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${course.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.number_of_purchases}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${course.total_revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-lg font-bold">Total Revenue: ${totalRevenue}</div>
      <div className="mt-2 text-sm text-red-600">
        <p>Note: 10% of the total revenue will be deducted by EduSphere company as platform fees and 5% will be deducted as tax.</p>
      </div>
    </div>
  );
};

export default RevenueInfo;