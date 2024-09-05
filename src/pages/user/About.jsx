import React from 'react';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import Footer from './common/Footer';
import logo1 from '../../assets/images/netflix.png';
import logo2 from '../../assets/images/google.png';
import logo3 from '../../assets/images/youtube.png';
import logo4 from '../../assets/images/lenovo.png';
import logo5 from '../../assets/images/microsoft.png';
import logo6 from '../../assets/images/slack.png';

export const About = () => {
  return (
    <>
      <Header />
      <SubHeader />

      {/* About Us Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700">
          Welcome to EduSphere, an innovative e-learning platform designed to empower students with
          high-quality online courses in various subjects.
        </p>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
            <p className="text-gray-700">We offer a wide range of online courses across various fields like programming, design, business, and more.</p>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Certified Instructors</h3>
            <p className="text-gray-700">Learn from industry experts and certified instructors who bring real-world experience to the classroom.</p>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-gray-700">Access courses on any device at your convenience with flexible schedules and self-paced learning.</p>
          </div>
        </div>
      </section>

      {/* Our Brand Partners Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Brand Partners</h2>
        <div className="overflow-hidden relative">
          <div className="flex space-x-8 animate-marquee">
            <div className="p-4 bg-white shadow-lg rounded-lg w-40 h-20 flex items-center justify-center">
              <img src={logo1} alt="Brand 1" className="h-12" />
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg w-40 h-20 flex items-center justify-center">
              <img src={logo2} alt="Brand 2" className="h-12" />
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg w-40 h-20 flex items-center justify-center">
              <img src={logo3} alt="Brand 3" className="h-12" />
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg w-40 h-20 flex items-center justify-center">
              <img src={logo4} alt="Brand 4" className="h-12" />
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg w-40 h-20 flex items-center justify-center">
              <img src={logo5} alt="Brand 5" className="h-12" />
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg w-40 h-20 flex items-center justify-center">
              <img src={logo6} alt="Brand 6" className="h-12" />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline CSS using styled-jsx */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </>
  );
};

export default About;
