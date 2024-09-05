import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../common/Header';
import { SubHeader } from '../common/SubHeader';
import Footer from '../common/Footer';
import api from '../../../api';
import Payment from './Payment';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [userId, setUserId] = useState('')

    useEffect(() => {
        // Fetch course details by ID
        const token = localStorage.getItem('access');
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
        api.get(`/api/student-courses/${courseId}`)
            .then(response => {
                setCourse(response.data);
                checkPurchaseStatus(response.data.id);
            })
            .catch(error => console.error('Error fetching course details:', error));
    }, [courseId]);

    const checkPurchaseStatus = async (courseId) => {
        try {
            const response = await api.get(`/api/check-purchase/${courseId}`);
            setHasPurchased(response.data.purchased);
        } catch (error) {
            console.error('Error checking purchase status:', error);
        }
    };

    const handleBack = () => {
        navigate('/student/all-course'); // Adjust the path as needed
    };

    if (!course) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <SubHeader />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative mx-auto mt-6" style={{ maxWidth: '800px' }}>
                        <h1 className="text-3xl font-bold text-blue-700 mb-4">{course.title}</h1>
                        {hasPurchased ? (
                            <video
                                controls
                                className="w-full h-auto object-cover"
                                style={{ maxHeight: '450px' }}
                            >
                                <source src={course.course_video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="relative w-full h-0 pb-[56.25%] mb-4">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                                    style={{ height: '100%', width: '100%' }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-black bg-opacity-50 p-2 rounded-full">
                                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 3l14 9-14 9V3z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full mb-4 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        >
                            Back to Courses
                        </button>
                        <p className="text-gray-700 mb-2 text-lg font-semibold">{course.category.name}</p>
                        <p className="text-gray-600 mb-2 text-md">{course.subtitle}</p>
                        <p className="text-blue-600 text-xl font-bold mb-4">${course.price}</p>
                        <p className="text-gray-800 mb-4 text-base">{course.description}</p>
                        <h2 className="text-2xl font-semibold text-blue-600 mb-2">What You Will Learn</h2>
                        <p className="text-gray-800 mb-4 text-base">{course.what_you_will_learn}</p>

                        {/* Purchase Button */}
                        {!hasPurchased && (
                            <div className="text-center mt-6">
                                <Payment courseId={course.id} userId={userId} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CourseDetail;
