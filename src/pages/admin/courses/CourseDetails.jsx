import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api';
import { SideBar } from '../common/SideBar';
import Header from '../common/Header';

const CourseDetails = () => {
    const location = useLocation();
    const { id } = location.state || {}; // Retrieve ID from location state
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                if (id) {
                    const response = await api.get(`/api/admin-details/${id}/`);
                    setCourse(response.data);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    const handleBackClick = () => {
        navigate('/admin/course_list'); // Navigate to course list page
    };

    // Calculate height for the thumbnail and video
    const height = 'calc(100vw / 5)'; // 1/5 of the viewport width

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-grow flex flex-col">
                <Header />
                <div className="p-6">
                    <button
                        onClick={handleBackClick}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Back to Course List
                    </button>
                    <h1 className="text-2xl font-semibold mb-4">Course Title: {course.title}</h1>
                    
                    {/* Course Thumbnail and Video */}
                    <div className="mb-4">
                        <div className="flex space-x-4">
                            <div className="flex flex-col items-center w-1/2">
                                <h2 className="text-xl font-semibold mb-2">Thumbnail</h2>
                                <img
                                    src={course.thumbnail}
                                    alt="Course Thumbnail"
                                    className="w-full h-full object-cover"
                                    style={{ height }}
                                />
                            </div>
                            <div className="flex flex-col items-center w-1/2">
                                <h2 className="text-xl font-semibold mb-2">Course Video</h2>
                                <video
                                    controls
                                    className="w-full h-full object-cover"
                                    style={{ height }}
                                >
                                    <source src={course.course_video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    {/* Course Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Subtitle</h2>
                                <p>{course.subtitle}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Category</h2>
                                <p>{course.category.name}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Sub Category</h2>
                                <p>{course.subcategory.name}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Price</h2>
                                <p>${course.price}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Description</h2>
                                <p>{course.description}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">What You Will Learn</h2>
                                <p>{course.what_you_will_learn}</p>
                            </div>
                        </div>

                        {/* Course Instructor */}
                        <div>
                            <h2 className="text-xl font-semibold">Instructor</h2>
                            <p>{course.instructor.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
