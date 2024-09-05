import React from 'react';
import logo1 from '../../../assets/images/netflix.png';
import logo2 from '../../../assets/images/google.png';
import logo3 from '../../../assets/images/youtube.png';
import logo4 from '../../../assets/images/lenovo.png';
import logo5 from '../../../assets/images/microsoft.png';
import logo6 from '../../../assets/images/slack.png';

function TrustedCompanies() {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <header className="mb-6">
                <h2 className="text-2xl font-semibold text-blue-600">6.3k Trusted Companies</h2>
            </header>
            <div className="logo-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {/* Add logo elements here */}
                <div className="flex items-center justify-center bg-white p-4 rounded shadow-md">
                    <img src={logo1} alt="Company Logo" className="h-12 w-auto" />
                </div>
                <div className="flex items-center justify-center bg-white p-4 rounded shadow-md">
                    <img src={logo2} alt="Company Logo" className="h-12 w-auto" />
                </div>
                <div className="flex items-center justify-center bg-white p-4 rounded shadow-md">
                    <img src={logo3} alt="Company Logo" className="h-12 w-auto" />
                </div>
                <div className="flex items-center justify-center bg-white p-4 rounded shadow-md">
                    <img src={logo4} alt="Company Logo" className="h-12 w-auto" />
                </div>
                <div className="flex items-center justify-center bg-white p-4 rounded shadow-md">
                    <img src={logo5} alt="Company Logo" className="h-12 w-auto" />
                </div>
                <div className="flex items-center justify-center bg-white p-4 rounded shadow-md">
                    <img src={logo6} alt="Company Logo" className="h-12 w-auto" />
                </div>
                {/* Add more logo elements as needed */}
            </div>
            <p className="text-gray-700 text-center text-lg">
                Join the ranks of industry leaders who trust our platform to drive their success.<br/> With over 6,300 companies relying on us, we are committed to excellence and innovation.<br/> Discover how we empower businesses to thrive in a competitive landscape with unmatched support and cutting-edge solutions.
            </p>
        </div>
    );
}

export default TrustedCompanies;
