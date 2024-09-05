import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { toast } from 'react-toastify'; // For toaster notifications
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { SideBar } from '../common/SideBar';
import Header from '../common/Header';
import api from '../../../api';
import { jwtDecode } from 'jwt-decode';

export const InstructorCourseAdd = () => {
    const navigate = useNavigate(); // For navigation
    const token = localStorage.getItem('access');
    const decodedToken = jwtDecode(token);
    const instructorId = decodedToken.user_id;

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [courseVideo, setCourseVideo] = useState(null);
    const [description, setDescription] = useState('');
    const [whatYouWillLearn, setWhatYouWillLearn] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the backend
        api.get('/admin_api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });

        // Fetch subcategories based on selected category if needed
        if (category) {
            api.get(`/admin_api/subcategories/`)
                .then(response => {
                    setSubcategories(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the subcategories!', error);
                });
        }
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('instructor', instructorId);
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('price', price);
        formData.append('thumbnail', thumbnail);
        formData.append('course_video', courseVideo);
        formData.append('description', description);
        formData.append('what_you_will_learn', whatYouWillLearn);
        formData.append('is_active', false); // Set to true on form submission

        api.post('/api/courses/', formData)
            .then(response => {
                console.log('Course added successfully:', response.data);
                toast.success('Course added successfully!'); // Show success toaster
                navigate('/instructor/courses'); // Redirect to course list page
            })
            .catch(error => {
                console.error('There was an error adding the course!', error);
                toast.error('Error adding course.'); // Show error toaster
            });
    };

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-grow flex flex-col">
                <Header />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Form fields */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Subtitle</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={subcategory}
                                onChange={(e) => setSubcategory(e.target.value)}
                            >
                                <option value="">Select a subcategory</option>
                                {subcategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail</label>
                            <input
                                type="file"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setThumbnail(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Course Video</label>
                            <input
                                type="file"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setCourseVideo(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">What You Will Teach</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={whatYouWillLearn}
                                onChange={(e) => setWhatYouWillLearn(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
