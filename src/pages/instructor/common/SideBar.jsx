import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/Logo.png';
import { Home, Book, Users, FileText, DollarSign, LogOut, MessageCircle } from 'react-feather'; // Import icons from Feather Icons

export const SideBar = () => {
    return (
        <div className="bg-blue-500 text-white h-scree w-64">
            {/* Logo and Name */}
            <div className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-20 mr-2" />
                <span className="text-xl font-bold">EduSphere</span>
            </div>

            <div className="border-t border-white my-2"></div>

            {/* Instructor Panel Text */}
            <div className="text-center py-4">
                <span className="text-xl font-semibold">Instructor</span>
            </div>

            <div className="border-t border-white my-2"></div>

            {/* Navigation Links */}
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link to="/instructor/dashboard" className="block py-2 px-4 hover:bg-blue-600">
                            <Home className="inline-block mr-2" /> Overview
                        </Link>
                    </li>
                    <li>
                        <Link to="/instructor/courses" className="block py-2 px-4 hover:bg-blue-600">
                            <Book className="inline-block mr-2" /> Courses
                        </Link>
                    </li>
                    <li>
                        <Link to="/instructor/users" className="block py-2 px-4 hover:bg-blue-600">
                            <Users className="inline-block mr-2" /> Enrollment
                        </Link>
                    </li>
                    <li>
                        <Link to="/instructor/chat-room" className="block py-2 px-4 hover:bg-blue-600">
                            <MessageCircle className="inline-block mr-2" /> Chat Rooms
                        </Link>
                    </li>
                    <li>
                        <Link to="/instructor/exams" className="block py-2 px-4 hover:bg-blue-600">
                            <FileText className="inline-block mr-2" /> Exams
                        </Link>
                    </li>
                    <li>
                        <Link to="/instructor/revenue" className="block py-2 px-4 hover:bg-blue-600">
                            <DollarSign className="inline-block mr-2" /> Revenue
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="block py-2 px-4 hover:bg-blue-600">
                            <LogOut className="inline-block mr-2" /> Sign Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
