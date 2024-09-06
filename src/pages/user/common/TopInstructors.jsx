import React, { useState, useEffect } from 'react';
import api from '../../../api'; // Adjust the import based on your project structure

const TopInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const dummyImage = 'https://via.placeholder.com/150'; // URL for the dummy image
    const baseURL = 'https://edusphere.duckdns.org'; // Base URL for Django server

    useEffect(() => {
        // Fetch top instructors from the API
        const fetchInstructors = async () => {
            try {
                const response = await api.get('/student/top-instructors');
                setInstructors(response.data);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        fetchInstructors();
    }, []);

    return (
        <div className="p-4 bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-6">Top Instructors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {instructors.map(instructor => (
                    <div key={instructor.id} className="bg-white shadow-md rounded-full p-4 flex flex-col items-center text-center">
                        <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
                            <img
                                src={instructor.profile_image ? `${instructor.profile_image}` : dummyImage}
                                alt={instructor.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">{instructor.username}</h2>
                        <p className="text-gray-600 mb-2">{instructor.number_of_students} Students</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopInstructors;
