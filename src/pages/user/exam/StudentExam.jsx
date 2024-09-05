import React, { useState, useEffect } from 'react';
import { Header } from '../common/Header';
import { SubHeader } from '../common/SubHeader';
import { useNavigate } from 'react-router-dom';

export const StudentExam = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/student-exam/exams-list/')
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(error => console.error('Error fetching exams:', error));
    }, []);

    const handleEnterExam = (examId) => {
        navigate(`/student-exam/${examId}/details`);
    };

    return (
        <>
            <Header />
            <SubHeader />
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/4 py-3 px-4 text-left">Exam Name</th>
                                <th className="w-1/4 py-3 px-4 text-left">Course</th>
                                <th className="w-1/4 py-3 px-4 text-left">Instructor</th>
                                {/* <th className="w-1/4 py-3 px-4 text-left">Created At</th> */}
                                <th className="w-1/4 py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map(exam => (
                                <tr key={exam.id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4">{exam.title}</td>
                                    <td className="py-3 px-4">{exam.course_title}</td>
                                    <td className="py-3 px-4">{exam.instructor_name}</td>
                                    {/* <td className="py-3 px-4">{new Date(exam.created_at).toLocaleString()}</td> */}
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleEnterExam(exam.id)}
                                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        >
                                            Enter Exam
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
