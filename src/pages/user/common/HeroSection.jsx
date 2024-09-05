import teacher from "../../../assets/images/Teacher.jpg"
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const handleCourseClick = () => {
        navigate('/student/all-course');
    };
    return (
        <div className="flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row items-center w-full">
                {/* Left Section */}
                <div className="md:w-1/2 p-4 flex items-center justify-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Learn with expert<br/>anytime anywhere</h1>
                        <p className="text-lg mb-6">
                            Our mission is to help people find the best courses online<br/>and learn with experts anytime, anywhere.
                        </p>
                        <button onClick={handleCourseClick} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-500">
                            Courses
                        </button>
                    </div>
                </div>
                
                {/* Right Section */}
                <div className="md:w-1/2 p-4">
                    <img src={teacher} alt="Instructor" className="w-full h-auto rounded" />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
