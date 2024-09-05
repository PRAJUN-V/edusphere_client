import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import Footer from '../user/common/Footer';
import { DatePicker } from 'antd';
import { Line } from 'react-chartjs-2';
import 'antd/dist/reset.css'; // Import Ant Design styles
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const { MonthPicker } = DatePicker;

export const InstructorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Enrollments',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    const fetchInstructorStats = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          throw new Error('No access token found');
        }

        const decodedToken = jwtDecode(token);
        const instructorId = decodedToken.user_id;

        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/instructor-stats/${instructorId}/`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStats(data);

        // Fetch course details
        const coursesResponse = await fetch(
          `http://127.0.0.1:8000/dashboard/instructor-course/${instructorId}/`
        );
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch course details');
        }
        const coursesData = await coursesResponse.json();
        setCourseDetails(coursesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorStats();
  }, []);

  useEffect(() => {
    const fetchEnrollmentData = async () => {
      if (!selectedDate) return;

      setLoading(true);
      const year = selectedDate.year();
      const month = selectedDate.month() + 1; // Months are 0-based
      const token = localStorage.getItem('access');
      const decodedToken = jwtDecode(token);
      const instructorId = decodedToken.user_id;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/instructor/enrollment-data/${instructorId}/?year=${year}&month=${month}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch enrollment data');
        }
        const data = await response.json();

        // Handle empty data case
        const dates = data.length > 0 ? data.map((entry) => entry.date) : ['No Data'];
        const enrollments = data.length > 0 ? data.map((entry) => entry.count) : [0];

        // Determine the max value and adjust the y-axis range
        const maxEnrollment = data.length > 0 ? Math.max(...enrollments) : 10; // Default max value for empty data
        const yAxisMax = Math.ceil(maxEnrollment / 10) * 10;

        setEnrollmentData({
          labels: dates,
          datasets: [
            {
              label: 'Enrollments',
              data: enrollments,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });

        // Update chart options with dynamic y-axis max value
        setChartOptions({
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  // Remove decimal values
                  return Math.floor(value);
                },
              },
              min: 0, // Ensure y-axis starts from 0
              max: yAxisMax,
            },
          },
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentData();
  }, [selectedDate]);

  const [chartOptions, setChartOptions] = useState({
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            // Remove decimal values
            return Math.floor(value);
          },
        },
        min: 0, // Ensure y-axis starts from 0
        max: 10, // Default value, will be updated dynamically
      },
    },
  });

  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-grow flex flex-col">
          <Header />
          <main className="p-4 flex-grow">
            <h1 className="text-2xl font-bold mb-4">Overview</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {stats && (
              <div className="flex space-x-8 mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-gray-400 text-white p-6 rounded-lg shadow-lg flex-1 text-center">
                  <h3 className="text-xl font-semibold mb-2">Number of Students</h3>
                  <div className="text-2xl">{stats.number_of_students}</div>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-gray-400 text-white p-6 rounded-lg shadow-lg flex-1 text-center">
                  <h3 className="text-xl font-semibold mb-2">Number of Enrollments</h3>
                  <div className="text-2xl">{stats.number_of_enrollments}</div>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-gray-400 text-white p-6 rounded-lg shadow-lg flex-1 text-center">
                  <h3 className="text-xl font-semibold mb-2">Total Courses</h3>
                  <div className="text-2xl">{stats.total_courses}</div>
                </div>
              </div>
            )}
            {courseDetails.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Course Details</h2>
                <table className="min-w-full bg-white border border-gray-300 text-center">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-2 px-4 border-r">Course Name</th>
                      <th className="py-2 px-4 border-r">Number of Students</th>
                      <th className="py-2 px-4 border-r">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseDetails.map((course) => (
                      <tr key={course.title}>
                        <td className="py-2 px-4 border-r">{course.title}</td>
                        <td className="py-2 px-4 border-r">{course.number_of_students}</td>
                        <td className="py-2 px-4 border-r">${course.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Enrollment Statistics</h2>
              <MonthPicker
                placeholder="Select month and year"
                onChange={(date) => setSelectedDate(date)}
              />
              {loading ? <p>Loading chart...</p> : (
                <div className="p-4 border mt-4 border-gray-300 rounded-lg" style={{ width: '800px', height: '400px' }}>
                  <Line
                    data={enrollmentData}
                    options={chartOptions}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstructorDashboard;
