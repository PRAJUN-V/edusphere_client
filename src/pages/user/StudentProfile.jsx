import React, { useState, useEffect } from 'react';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import Footer from './common/Footer';
import api from '../../api'; // Ensure this API import works with your project setup
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

export const StudentProfile = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        profile_picture: '',
        phone_number: '', // Added phone_number
        oldPassword: '', // Added for password change
        newPassword: '', // Added for password change
        confirmPassword: '' // Added for password change
    });

    useEffect(() => {
        const token = localStorage.getItem('access'); // Adjust this if you use a different storage or token name
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id; // Adjust according to your token structure

            // Fetch user data from the API when the component mounts
            const fetchUserData = async () => {
                try {
                    const response = await api.get(`/student/student/${userId}`); // Use extracted userId
                    const userData = response.data;
                    setUser({
                        first_name: userData.first_name || '',
                        last_name: userData.last_name || '',
                        username: userData.username || '',
                        email: userData.email || '',
                        profile_picture: userData.profile.profile_image ? `${userData.profile.profile_image}` : 'https://randomuser.me/api/portraits/men/81.jpg',
                        phone_number: userData.profile.phone_number || '' // Fetch phone number
                    });
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            };

            fetchUserData();
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        console.log('User Data to be Updated:', user); // Log payload

        const token = localStorage.getItem('access'); // Adjust this if you use a different storage or token name
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id; // Adjust according to your token structure

            try {
                const updateResponse = await api.patch(`/student/student/update/${userId}/`, user); // Use extracted userId

                if (updateResponse.status === 200) {
                    const fetchResponse = await api.get(`/student/student/${userId}`); // Fetch updated user data
                    const updatedUserData = fetchResponse.data;
                    setUser({
                        first_name: updatedUserData.first_name || '',
                        last_name: updatedUserData.last_name || '',
                        username: updatedUserData.username || '',
                        email: updatedUserData.email || '',
                        profile_picture: updatedUserData.profile.profile_image ? `{updatedUserData.profile.profile_image}` : 'https://randomuser.me/api/portraits/men/81.jpg',
                        phone_number: updatedUserData.profile.phone_number || '' // Fetch phone number
                    });
                    toast.success('User data updated successfully!'); // Show success notification
                    console.log('User data updated:', updatedUserData);
                } else {
                    toast.error('Failed to update user data.'); // Show error notification
                    console.error('Failed to update user data. Status:', updateResponse.status);
                }
            } catch (error) {
                toast.error('Failed to update user data.'); // Show error notification
                console.error('Failed to update user data:', error);
            }
        }
    };

    const handlePhoneNumberChange = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            try {
                const updateResponse = await api.patch(`/student/student/update/${userId}/`, {
                    profile: {
                        phone_number: user.phone_number
                    }
                });

                if (updateResponse.status === 200) {
                    toast.success('Phone number updated successfully!');
                } else {
                    toast.error('Failed to update phone number.');
                    console.error('Failed to update phone number. Status:', updateResponse.status);
                }
            } catch (error) {
                toast.error('Failed to update phone number.');
                console.error('Failed to update phone number:', error);
            }
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = user;
    
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match.');
            return;
        }
    
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;
    
            try {
                const response = await api.patch(`/student/student/update/${userId}/`, {
                    old_password: oldPassword,
                    new_password: newPassword
                });
    
                if (response.status === 200) {
                    toast.success('Password changed successfully!');
                    setUser((prevUser) => ({
                        ...prevUser,
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }));
                } else {
                    toast.error('Failed to change password.');
                    console.error('Failed to change password. Status:', response.status);
                }
            } catch (error) {
                toast.error('Failed to change password.');
                console.error('Failed to change password:', error);
            }
        }
    };


    return (
        <>
            <Header />
            <SubHeader />
            <div className="min-h-screen bg-gray-100 pb-4">
                <div className="bg-blue-100 py-4">
                    <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg px-6 py-4 relative">
                        <div className="flex items-center space-x-4">
                            <img
                                className="w-24 h-24 rounded-full object-cover"
                                src={user.profile_picture || 'https://randomuser.me/api/portraits/men/81.jpg'}
                                alt="User Profile"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{user.username}</h2> {/* Display username */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-screen-lg mx-auto mt-4 bg-white rounded-lg shadow-lg px-12 py-12">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                    <form onSubmit={handleSaveChanges}>
                        <div className="mb-4">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={user.first_name || ''}
                                id="first_name"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={user.last_name || ''}
                                id="last_name"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email || ''}
                                id="email"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex">
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>
                    <hr className="my-6 border-gray-300" />

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Phone Number</h3>
                        <form onSubmit={handlePhoneNumberChange}>
                            <div className="mb-4">
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={user.phone_number || ''}
                                    id="phone_number"
                                    className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex">
                                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                                    Save Phone Number
                                </button>
                            </div>
                        </form>
                    </div>

                    <hr className="my-6 border-gray-300" />

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                        <div className="mb-4">
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                value={user.oldPassword || ''}
                                id="oldPassword"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={user.newPassword || ''}
                                id="newPassword"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={user.confirmPassword || ''}
                                id="confirmPassword"
                                className="mt-1 block w-1/2 sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex">
                            <button type="button" onClick={handleChangePassword} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm">
                                Reset Password
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
            <ToastContainer /> {/* Add ToastContainer to render notifications */}
        </>
    );
};

export default StudentProfile;
