import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../../api';

const FirstLoginForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        profile_image: null,
        phone_number: '',
        interests: []
    });

    const [interestOptions, setInterestOptions] = useState([]);
    const [userId, setUserId] = useState(null);
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Extract user ID from JWT token
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id); // Adjust the field name based on your token payload
        }

        // Fetch interest options
        api.get('/admin_api/categories/')
            .then(response => setInterestOptions(response.data))
            .catch(error => console.error('Error fetching interests:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            profile_image: e.target.files[0]
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            interests: checked
                ? [...prevData.interests, value]
                : prevData.interests.filter(id => id !== value)
        }));
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('User ID is missing.');
            return;
        }

        try {
            // Update User model
            await api.patch(`/student/users/${userId}/`, {
                first_name: formData.first_name,
                last_name: formData.last_name
            });

            // Update Profile model
            const profileData = new FormData();
            profileData.append('profile_image', formData.profile_image);
            profileData.append('phone_number', formData.phone_number);
            profileData.append('interest_ids', JSON.stringify(formData.interests));
            profileData.append('first_login', false); // Set first_login to false

            await api.patch(`/student/profiles/${userId}/`, profileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Profile updated');
            onSubmit(); // Callback to handle successful form submission
            setFormData({
                first_name: '',
                last_name: '',
                profile_image: null,
                phone_number: '',
                interests: []
            }); // Reset form
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form onSubmit={step === 2 ? handleSubmit : handleNextStep} className="p-4 bg-white shadow rounded">
            {step === 1 && (
                <>
                    <h2 className="text-2xl mb-4">Complete Your Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Next
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className="text-2xl mb-4">Select Your Interests</h2>
                    <div className="mb-4">
                        {interestOptions.map(interest => (
                            <div key={interest.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    value={interest.id}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label>{interest.name}</label>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </>
            )}
        </form>
    );
};

export default FirstLoginForm;
