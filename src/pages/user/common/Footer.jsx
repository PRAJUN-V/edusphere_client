import React from 'react';
import logo from "../../../assets/images/Logo.png"

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-800 p-10  font-bold">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                <aside className="flex flex-col items-center md:items-start">
                    <img
                        src={logo} 
                        alt="Logo"
                        className="w-12 h-12 mb-4"
                    />
                    <p className="text-center md:text-left">
                        EduSphere Industries Ltd.
                        <br />
                        Providing e-learning since 2024
                    </p>
                </aside>
                <nav className="flex flex-col items-center md:items-start">
                    <h6 className="footer-title text-gray-800 font-bold mb-4">Course</h6>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Become an Instructor</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Design</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Marketing</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Advertisement</a>
                </nav>
                <nav className="flex flex-col items-center md:items-start">
                    <h6 className="footer-title text-gray-800 font-bold mb-4">Company</h6>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">About us</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Contact</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Jobs</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Press kit</a>
                </nav>
                <nav className="flex flex-col items-center md:items-start">
                    <h6 className="footer-title text-gray-800 font-bold mb-4">Legal</h6>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Terms of use</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Privacy policy</a>
                    <a className="link link-hover text-gray-600 hover:text-gray-800 mb-2" href="#">Cookie policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
