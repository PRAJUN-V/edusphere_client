import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
import { Header } from '../common/Header';
import { SubHeader } from '../common/SubHeader';
import Footer from '../common/Footer';
import { FaSearch } from 'react-icons/fa';
import api from '../../../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('oldToNew');
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch courses and categories from backend
    useEffect(() => {
        // Fetch courses
        api.get('/api/student-courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));

        // Fetch categories
        api.get('/admin_api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Implement search submit logic if needed
    };

    const handleViewDetails = (courseId) => {
        navigate(`/student/course-detail/${courseId}`); // Redirect to course detail page
    };

    // Filter and sort courses
    const filteredCourses = courses
        .filter(course => 
            (course.title.toLowerCase().includes(search.toLowerCase())) &&
            (selectedCategory ? course.category.name === selectedCategory : true)
        )
        .sort((a, b) => {
            if (sortOption === 'priceLowToHigh') {
                return a.price - b.price;
            } else if (sortOption === 'newToOld') {
                return new Date(b.date) - new Date(a.date);
            } else {
                return 0;
            }
        });

    return (
        <>
            <Header />
            <SubHeader />
            <div className="p-4 bg-gray-100">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">All Courses</h1>
                <div className="mb-4 flex items-center space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-2 border rounded bg-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search courses"
                            className="p-2 border rounded bg-white w-41"
                        />
                        <button
                            onClick={handleSearchSubmit}
                            className="ml-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="p-2 border rounded bg-white"
                    >
                        <option value="oldToNew">Old to New</option>
                        <option value="priceLowToHigh">Price Low to High</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="bg-white shadow-md rounded p-4">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-32 object-cover rounded mb-4"
                            />
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">{course.title}</h2>
                            <p className="text-gray-600 mb-2">{course.category.name}</p>
                            <p className="text-blue-500 font-bold mb-4">${course.price}</p>
                            <button
                                onClick={() => handleViewDetails(course.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};
