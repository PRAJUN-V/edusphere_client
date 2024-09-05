import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SideBar } from '../common/SideBar';
import Header from '../common/Header';
import Footer from '../../user/common/Footer';
import AddQuestionModal from './components/AddQuestionModal';

const InstructorExamDetails = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/exam/exam/exam/${examId}/`);
                setExam(response.data);
            } catch (error) {
                console.error('Error fetching exam details:', error);
            }
        };

        fetchExamDetails();
    }, [examId]);

    const handleAddQuestion = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!exam) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <main className="relative p-4 flex flex-col">
                        <h1 className="text-2xl font-bold">Exam Details</h1>
                        <button
                            onClick={handleAddQuestion}
                            className="absolute  right-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Question
                        </button>
                        <div className="space-y-4 mt-12">
                            <p><strong>Exam ID:</strong> {exam.id}</p>
                            <p><strong>Exam Name:</strong> {exam.title}</p>
                            {/* <p><strong>Course:</strong> {exam.course_title}</p>
                            <p><strong>Instructor:</strong> {exam.instructor_name}</p> */}
                            <p><strong>Status:</strong> {exam.is_active ? 'Active' : 'Inactive'}</p>
                            <p><strong>Created At:</strong> {new Date(exam.created_at).toLocaleString()}</p>
                        </div>
                        <div className="mt-12">
                            <h2 className="text-xl font-bold mb-4">Questions</h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {exam.questions.map((question) => (
                                        <tr key={question.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {question.question_text}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {question.marks}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <ul className="list-disc list-inside space-y-2">
                                                    {question.options.map((option, index) => (
                                                        <li key={index} className="flex items-center space-x-2">
                                                            <span>{option.option_text}</span>
                                                            {option.is_correct && <span className="text-green-500">&#10003;</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>

            {isModalOpen && <AddQuestionModal examId={examId} onClose={handleCloseModal} />}
        </>
    );
};

export default InstructorExamDetails;
