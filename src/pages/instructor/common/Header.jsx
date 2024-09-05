import React from 'react';
import { FaBell } from 'react-icons/fa';
import profileImage from '../../../assets/images/Logo.png'; // Replace with your actual profile picture URL

const Header = () => {
    return (
      <div className="bg-white p-6 flex justify-between items-center shadow">
        <div className="flex-grow"></div>
        <div className="flex items-center">
          <FaBell className="text-gray-500 h-6 w-6 hover:text-blue-600 mr-4" />
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;