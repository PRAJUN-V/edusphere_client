import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { SideBar } from '../common/SideBar';
import Header from '../common/Header';
import Footer from '../../user/common/Footer';

const InstructorCreateExam = () => {
    const [instructorId, setInstructorId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch instructor ID from JWT token
        const fetchInstructorId = () => {
            const token = localStorage.getItem('access');
            if (token) {
                const decoded = jwtDecode(token);
                setInstructorId(decoded.user_id);
            }
        };

        fetchInstructorId();
    }, []);

    useEffect(() => {
        if (instructorId) {
            axios.get(`https://edusphere.duckdns.org/exam/courses/${instructorId}/`)
                .then(response => {
                    setCourses(response.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }
    }, [instructorId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://edusphere.duckdns.org/exam/create-exam/', {
            instructor: instructorId,
            course: selectedCourse,
            title: title
        })
            .then(response => {
                console.log('Exam created:', response.data);
                navigate('/instructor/exams'); // Redirect after successful creation
            })
            .catch(error => {
                console.error('Error creating exam:', error);
            });
    };

    if (instructorId === null) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <main className="p-4 flex flex-col">
                        <h1 className="text-2xl font-bold mb-4">Create Exam</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                                    Course:
                                </label>
                                <select
                                    id="course"
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-14 px-3"
                                    style={{ height: '3.5rem' }} // Adjust height as needed
                                >
                                    <option value="">Select a course</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Exam Title:
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-3 py-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Create Exam
                            </button>
                        </form>
                    </main>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default InstructorCreateExam;
