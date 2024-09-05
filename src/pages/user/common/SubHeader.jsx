import React, { useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import logo from '../../../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../../assets/images/Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../../../redux/authSlice';

export const SubHeader = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    // Initialize isAuthenticated from localStorage on mount
    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('access') ? true : false;
        dispatch(setAuthenticated(storedIsAuthenticated));
    }, [dispatch]);

    const handleProfileClick = () => {
        console.log("Navigate to profile");
        navigate('/student/profile');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('access');
        dispatch(setAuthenticated(false)); // Dispatch action to update isAuthenticated
        navigate('/logout');
    };

    const handleCreateAccountClick = () => {
        console.log("Navigate to create account");
        navigate('/register');
    };

    const handleSignInClick = () => {
        navigate('/login');
    };

    console.log(isAuthenticated);

    return (
        <div className="bg-gray-100 p-1 flex justify-between items-center shadow">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Edusphere Logo" className="h-20" />
                <span className="text-2xl font-bold">
                    <span className="text-blue-500">Edu</span>
                    <span className="text-gray-500">Sphere</span>
                </span>
            </div>
            <div className="flex items-center space-x-4 pe-6">
                <FaBell className="text-gray-500 h-6 w-6 hover:text-blue-600" />
                {isAuthenticated ? (
                    <>
                        <img
                            onClick={handleProfileClick}
                            className="h-16 w-16 rounded-full cursor-pointer"
                            src={profileImage}
                            alt="User Profile"
                        />
                        <button onClick={handleLogoutClick} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Logout</button>
                    </>
                ) : (
                    // <>
                    //     <button onClick={handleCreateAccountClick} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Account</button>
                    //     <button onClick={handleSignInClick} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Sign In</button>
                    // </>

                    <>
                        <img
                            onClick={handleProfileClick}
                            className="h-16 w-16 rounded-full cursor-pointer"
                            src={profileImage}
                            alt="User Profile"
                        />
                        <button onClick={handleLogoutClick} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Logout</button>
                    </>
                )}
            </div>
        </div>
    );
};
