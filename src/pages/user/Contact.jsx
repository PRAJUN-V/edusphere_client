import React from 'react';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import Footer from './common/Footer';

export const Contact = () => {
    return (
        <>
            <Header />
            <SubHeader />

            {/* Contact Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Contact Form */}
                        <div className="bg-white p-8 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-lg font-medium mb-1" htmlFor="name">Your Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium mb-1" htmlFor="email">Your Email</label>
                                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium mb-1" htmlFor="message">Message</label>
                                    <textarea id="message" rows="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your message"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">Send Message</button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white p-8 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                            <p className="text-lg mb-4">
                                Have any questions? We'd love to hear from you. Get in touch with us through the following methods.
                            </p>
                            <ul className="text-lg space-y-4">
                                <li><strong>Address:</strong>Thalassry Kannur Kerala</li>
                                <li><strong>Phone:</strong> +91 8921745584</li>
                                <li><strong>Email:</strong> support@edusphere.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
