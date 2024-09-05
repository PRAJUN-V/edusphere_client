import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import { Header } from '../common/Header';
import { SubHeader } from '../common/SubHeader';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

export const StudentExamDetails = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [totalMarks, setTotalMarks] = useState(null);

    useEffect(() => {
        // Fetch exam details
        fetch(`http://127.0.0.1:8000/student-exam/exam-details/${examId}/`)
            .then(response => response.json())
            .then(data => {
                setExam(data);
                // Calculate total marks
                const total = data.questions.reduce((sum, question) => sum + question.marks, 0);
                setTotalMarks(total);
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching exam details.');
                setLoading(false);
            });
    }, [examId]);

    // Extract student ID from JWT token
    const getStudentId = () => {
        const token = localStorage.getItem('access');
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id; // Adjust based on your token structure
        }
        return null;
    };

    const handleOptionChange = (questionId, optionId) => {
        setSelectedOptions(prevOptions => ({ ...prevOptions, [questionId]: optionId }));
    };

    const handleSubmit = () => {
        const studentId = getStudentId(); // Get the student ID from the token
        if (!studentId) {
            setError('Student ID not found.');
            return;
        }

        const requestBody = { student_id: studentId, ...selectedOptions };
        console.log('Submitting:', requestBody); // Log the request body

        fetch(`http://127.0.0.1:8000/student-exam/exam-details/${examId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                if (data.marks_scored !== undefined) {
                    setScore(data.marks_scored);
                    setSubmitted(true);
                    setModalIsOpen(true);
                    toast.success('Exam submitted successfully.');
                } else if (data.detail === 'You have already completed this exam.') {
                    toast.info('You have already attended this exam.');
                    setTimeout(() => {
                        navigate('/student/exam');
                    }, 3000); // Redirect after 3 seconds
                } else {
                    toast.error(data.detail || 'Error submitting exam.');
                    setTimeout(() => {
                        navigate('/student/exam');
                    }, 3000); // Redirect after 3 seconds
                }
            })
            .catch(() => {
                toast.error('Error submitting exam.');
                setTimeout(() => {
                    navigate('/student/exam');
                }, 3000); // Redirect after 3 seconds
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <SubHeader />
            <ToastContainer />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{exam?.title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    {exam?.questions.map((question) => (
                        <div key={question.id} className="mb-6">
                            <p className="font-semibold">{question.question_text}</p>
                            {question.options.map((option) => (
                                <div key={option.id} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id={`option-${option.id}`}
                                        name={`question-${question.id}`}
                                        value={option.id}
                                        onChange={() => handleOptionChange(question.id, option.id)}
                                        className="mr-2"
                                        disabled={submitted}
                                    />
                                    <label htmlFor={`option-${option.id}`} className="text-gray-700">{option.option_text}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    {!submitted ? (
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Submit Exam
                        </button>
                    ) : null}
                </form>
            </div>

            {/* Modal for displaying score */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-white p-6 rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Your Score</h2>
                    <p className="text-lg mb-4">You scored {score} marks out of {totalMarks}!</p>
                    <button
                        onClick={() => {
                            setModalIsOpen(false);
                            navigate('/student/exam');
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Back to Exams
                    </button>
                </div>
            </Modal>
        </>
    );
};
