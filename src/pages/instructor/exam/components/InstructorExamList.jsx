import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstructorExamList = ({ instructorId }) => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/exam/tutor/${instructorId}/exams/`);
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };

        fetchExams();
    }, [instructorId]);

    const handleDetailsClick = (examId) => {
        navigate(`/instructor/instructor-exam-details/${examId}`);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Title</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Course Title</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Created At</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map((exam) => (
                        <tr key={exam.id}>
                            <td className="py-2 px-4 border-b text-sm text-gray-700">{exam.id}</td>
                            <td className="py-2 px-4 border-b text-sm text-gray-700">{exam.title}</td>
                            <td className="py-2 px-4 border-b text-sm text-gray-700">{exam.course_title}</td>
                            <td className="py-2 px-4 border-b text-sm text-gray-700">{exam.is_active ? 'Active' : 'Inactive'}</td>
                            <td className="py-2 px-4 border-b text-sm text-gray-700">{new Date(exam.created_at).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b text-sm text-gray-700">
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded"
                                    onClick={() => handleDetailsClick(exam.id)}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstructorExamList;
