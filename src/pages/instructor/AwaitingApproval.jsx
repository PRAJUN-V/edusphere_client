import React from 'react';
import { useNavigate } from 'react-router-dom';

const AwaitingApproval = () => {

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh')
        // dispatch(setAuthenticated(false)); // Dispatch action to update isAuthenticated
        console.log('logging out');
        navigate('/logout');
    };

    const handleEditApplication = () => {
        navigate('/instructor/edit-instructor-application');
    };

    return (
        <>
            <div className='bg-slate-200 p-8 flex items-center'>
                <div className='flex-1 text-center'>
                    <h1 className='text-3xl font-medium'>
                        Application Status
                    </h1>
                </div>
                <button onClick={handleLogoutClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Logout
                </button>
            </div>
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-bold mb-4'>Awaiting Approval</h1>
                <p className='text-lg text-gray-600'>
                    Your application to become a tutor is under review. Please wait for approval.
                </p>
                <p className='text-lg text-gray-600 mt-1'>
                    After reviewing by the admin, an email notification will be sent to you.
                </p>
                <button
                    onClick={handleEditApplication}
                    className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Edit Application
                </button>
            </div>
        </>
    );
};

export default AwaitingApproval;
