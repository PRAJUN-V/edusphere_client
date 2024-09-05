import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { SideBar } from '../common/SideBar';
import Header from '../common/Header';
import Footer from '../../user/common/Footer';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/api/admin-courses/'); // Update this URL based on your API endpoint
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleActivateDeactivate = async (id) => {
        try {
            const response = await api.patch(`/api/courses/${id}/toggle-active/`); // Update this URL based on your API endpoint
            setCourses(courses.map(course =>
                course.id === id ? { ...course, is_active: response.data.is_active } : course
            ));
        } catch (error) {
            console.error('Error toggling activation:', error);
        }
    };

    const handleViewDetails = (id) => {
        navigate('/admin/course-details', { state: { id } }); // Pass ID as state
    };

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <div className="p-6 flex-grow">
                        <h1 className="text-2xl font-semibold mb-4">Courses List</h1>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-3 px-4 text-left">ID</th>
                                    <th className="py-3 px-4 text-left">Instructor Username</th>
                                    <th className="py-3 px-4 text-left">Course Name</th>
                                    <th className="py-3 px-4 text-left">Category</th>
                                    <th className="py-3 px-4 text-left">Price</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id} className="border-b border-gray-200">
                                        <td className="py-3 px-4">{course.id}</td>
                                        <td className="py-3 px-4">{course.instructor.username}</td>
                                        <td className="py-3 px-4">{course.title}</td>
                                        <td className="py-3 px-4">{course.category.name}</td>
                                        <td className="py-3 px-4">${course.price}</td>
                                        <td className="py-3 px-4">{course.is_active ? 'Active' : 'Inactive'}</td>
                                        <td className="py-3 px-4 flex space-x-2">
                                            <button
                                                className={`py-1 px-3 text-white ${course.is_active ? 'bg-red-500' : 'bg-green-500'} rounded`}
                                                onClick={() => handleActivateDeactivate(course.id)}
                                            >
                                                {course.is_active ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                onClick={() => handleViewDetails(course.id)}
                                                className="py-1 px-3 bg-blue-500 text-white rounded"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    );
};

export default AdminCourses;
