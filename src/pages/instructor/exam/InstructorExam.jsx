import React, { useEffect, useState } from 'react';
import { SideBar } from '../common/SideBar';
import Header from '../common/Header';
import Footer from '../../user/common/Footer';
import { jwtDecode } from 'jwt-decode';
import InstructorExamList from './components/InstructorExamList';
import { useNavigate } from 'react-router-dom';

export const InstructorExam = () => {
    const [instructorId, setInstructorId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to get instructor ID from JWT token
        const getInstructorId = () => {
            const token = localStorage.getItem('access'); // or sessionStorage if used
            if (token) {
                const decoded = jwtDecode(token);
                setInstructorId(decoded.user_id); // Adjust according to your token payload
            }
        };

        getInstructorId();
    }, []);

    const handleCreateExam = () => {
        navigate('/instructor/create-exam');
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
                    <main className="p-4 relative">
                        <h1 className="text-2xl font-bold mb-4">Instructor Exam</h1>
                        <button
                            onClick={handleCreateExam}
                            className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Create Exam
                        </button>
                        <InstructorExamList instructorId={instructorId} />
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};
