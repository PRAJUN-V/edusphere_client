import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export const BecomeInstructorForm = () => {
    const [profileDescription, setProfileDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [houseName, setHouseName] = useState('');
    const [post, setPost] = useState('');
    const [street, setStreet] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [idProof, setIdProof] = useState(null);
    const [qualificationProof, setQualificationProof] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('access'); // Assuming the token is stored in localStorage
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken.user_id);
            return decodedToken.user_id; // Adjust this according to the structure of your token

        }
        return null;
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error('User ID not found in token');
                return;
            }

            try {
                const response = await api.get(`/instructor/profiles/${userId}/`);
                const data = response.data;
                setProfileDescription(data.profile_description || '');
                setGithubLink(data.github_link || '');
                setLinkedinLink(data.linkedin_link || '');
                setHouseName(data.house_name || '');
                setPost(data.post || '');
                setStreet(data.street || '');
                setCountry(data.country || '');
                setState(data.state || '');
                setDistrict(data.district || '');
                // Handle files separately
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = getUserIdFromToken();
        if (!userId) {
            console.error('User ID not found in token');
            return;
        }

        const formData = new FormData();
        formData.append('profile_description', profileDescription);
        formData.append('github_link', githubLink);
        formData.append('linkedin_link', linkedinLink);
        formData.append('house_name', houseName);
        formData.append('post', post);
        formData.append('street', street);
        formData.append('country', country);
        formData.append('state', state);
        formData.append('district', district);
        formData.append('application_submitted', true);
        if (idProof) formData.append('id_proof', idProof);
        if (qualificationProof) formData.append('qualification_proof', qualificationProof);

        try {
            const response = await api.patch(`/instructor/profiles/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Profile updated successfully:', response.data);
            navigate('/instructor/awaiting-approval'); // Navigate to AwaitingApproval page
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full mt-28 py-20'>
            <h1 className='text-4xl font-medium lg:-mt-20'>Fill the Form to Apply</h1>
            <form className='w-full max-w-2xl' onSubmit={handleSubmit}>
                <div className='w-full pt-5'>
                    <h1 className='text-xl py-3'>Profile Description</h1>
                    <hr />
                    <textarea
                        placeholder='Enter your profile description...'
                        className='w-full border rounded px-3 py-2'
                        value={profileDescription}
                        onChange={(e) => setProfileDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full pt-5'>
                    <h1 className='text-xl py-3'>GitHub Link (Optional)</h1>
                    <hr />
                    <input
                        type='url'
                        placeholder='Enter your GitHub link (optional)...'
                        className='w-full border rounded px-3 py-2'
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                    />
                </div>
                <div className='w-full pt-5'>
                    <h1 className='text-xl py-3'>LinkedIn Profile Link (Optional)</h1>
                    <hr />
                    <input
                        type='url'
                        placeholder='Enter your LinkedIn profile link (optional)...'
                        className='w-full border rounded px-3 py-2'
                        value={linkedinLink}
                        onChange={(e) => setLinkedinLink(e.target.value)}
                    />
                </div>
                <div className='w-full pt-5 grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='text-xl py-3'>House Name</h1>
                        <hr />
                        <input
                            type='text'
                            placeholder='Enter your house name...'
                            className='w-full border rounded px-3 py-2'
                            value={houseName}
                            onChange={(e) => setHouseName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h1 className='text-xl py-3'>Post</h1>
                        <hr />
                        <input
                            type='text'
                            placeholder='Enter your post...'
                            className='w-full border rounded px-3 py-2'
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='w-full pt-5 grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='text-xl py-3'>Street</h1>
                        <hr />
                        <input
                            type='text'
                            placeholder='Enter your street...'
                            className='w-full border rounded px-3 py-2'
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h1 className='text-xl py-3'>Country</h1>
                        <hr />
                        <input
                            type='text'
                            placeholder='Enter your country...'
                            className='w-full border rounded px-3 py-2'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='w-full pt-5 grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className='text-xl py-3'>State</h1>
                        <hr />
                        <input
                            type='text'
                            placeholder='Enter your state...'
                            className='w-full border rounded px-3 py-2'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h1 className='text-xl py-3'>District</h1>
                        <hr />
                        <input
                            type='text'
                            placeholder='Enter your district...'
                            className='w-full border rounded px-3 py-2'
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='w-full pt-5'>
                    <h1 className='text-xl py-3'>Upload ID Proof</h1>
                    <hr />
                    <input
                        type='file'
                        accept='image/*'
                        className='w-full border rounded px-3 py-2'
                        onChange={(e) => handleFileChange(e, setIdProof)}
                        required
                    />
                    <p className='text-sm text-gray-500'>Please upload an image file (e.g., .jpg, .png).</p>
                    <p className='text-red-500 text-sm mt-2'>Note: After submission, you will not be able to edit this field.</p>
                </div>
                <div className='w-full pt-5'>
                    <h1 className='text-xl py-3'>Upload Qualification Proof</h1>
                    <hr />
                    <input
                        type='file'
                        accept='image/*'
                        className='w-full border rounded px-3 py-2'
                        onChange={(e) => handleFileChange(e, setQualificationProof)}
                        required
                    />
                    <p className='text-sm text-gray-500'>Please upload an image file (e.g., .jpg, .png).</p>
                    <p className='text-red-500 text-sm mt-2'>Note: After submission, you will not be able to edit this field.</p>
                </div>
                <button type='submit' className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Submit
                </button>
            </form>
        </div>
    );
};
