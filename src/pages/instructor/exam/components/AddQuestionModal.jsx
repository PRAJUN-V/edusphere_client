import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionModal = ({ examId, onClose }) => {
    const [questionText, setQuestionText] = useState('');
    const [marks, setMarks] = useState('');
    const [options, setOptions] = useState([{ optionText: '', isCorrect: false }]);
    const [error, setError] = useState('');

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index][event.target.name] = event.target.value;
        setOptions(newOptions);
    };

    const handleOptionToggle = (index) => {
        const newOptions = [...options];
        newOptions[index].isCorrect = !newOptions[index].isCorrect;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, { optionText: '', isCorrect: false }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate fields
        if (!questionText || !marks || options.length === 0 || options.some(opt => !opt.optionText)) {
            setError('Please fill in all fields and provide at least one option.');
            return;
        }

        setError('');
        try {
            await axios.post('http://127.0.0.1:8000/exam/question/', {
                exam: examId,
                question_text: questionText,
                marks: parseInt(marks),
                options: options.map(option => ({
                    option_text: option.optionText,
                    is_correct: option.isCorrect
                }))
            });
            onClose(); // Close modal after successful submission
        } catch (error) {
            console.error('Error adding question:', error);
            setError('An error occurred while adding the question.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Add Question</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">
                            Question Text:
                        </label>
                        <textarea
                            id="questionText"
                            name="questionText"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-24"
                        />
                    </div>
                    <div>
                        <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                            Marks:
                        </label>
                        <input
                            id="marks"
                            name="marks"
                            type="number"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Options:</h3>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    name="optionText"
                                    value={option.optionText}
                                    onChange={(e) => handleOptionChange(index, e)}
                                    className="mt-1 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={option.isCorrect}
                                        onChange={() => handleOptionToggle(index)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span>Correct Answer</span>
                                </label>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddOption}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Another Option
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Save Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestionModal;
