import React, { useState, useEffect } from 'react';
import api from '../../../api'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom';

const AdminRecentlyAddedCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch courses from the backend
        const fetchCourses = async () => {
            try {
                const response = await api.get('/api/student-courses');
                const allCourses = response.data;

                // Sort courses by date to get the most recent ones (assuming there's a `date` field)
                const sortedCourses = allCourses.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Get the last three courses
                const recentCourses = sortedCourses.slice(0, 3);

                setCourses(recentCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleViewDetails = (courseId) => {
        navigate(`/student/course-detail/${courseId}`); // Redirect to course detail page
    };

    return (
        <div className="p-4 bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-6">Recently Added Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-white shadow-md rounded p-4">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-32 object-cover rounded mb-4"
                        />
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">{course.title}</h2>
                        <p className="text-gray-600 mb-2">{course.category.name}</p>
                        <p className="text-blue-500 font-bold mb-4">${course.price}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRecentlyAddedCourses;
