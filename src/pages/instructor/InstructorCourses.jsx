import React, { useState, useEffect } from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import Footer from '../user/common/Footer';

export const InstructorCourses = () => {
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategoryRequest, setSubCategoryRequest] = useState('');
  const [courses, setCourses] = useState([]); // State to hold courses data

  useEffect(() => {
    // Fetch categories from the backend
    api.get('/admin_api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });

    // Fetch courses related to the instructor
    const token = localStorage.getItem('access');
    const decodedToken = jwtDecode(token);
    const instructorId = decodedToken.user_id;
    api.get(`/api/instructor/${instructorId}/courses/`) // Adjust the endpoint based on your API
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error);
      });
  }, []);

  const handleSubCategoryRequest = () => {
    setShowSubCategoryForm(!showSubCategoryForm);
    if (!showSubCategoryForm) {
      // Reset form fields when opening the form
      setSelectedCategory('');
      setSubCategory('');
      setSubCategoryRequest('');
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleSubCategoryRequestChange = (e) => {
    setSubCategoryRequest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subCategoryData = {
      name: subCategory,
      description: subCategoryRequest,
      active: false,  // Set the active field to false
      category: selectedCategory,  // Include the selected category
    };

    api.post(`/admin_api/categories/${selectedCategory}/add_subcategory/`, subCategoryData)
      .then(response => {
        toast.success('Subcategory submission successful!');
        setSelectedCategory('');
        setSubCategory('');
        setSubCategoryRequest('');
        setShowSubCategoryForm(false);
      })
      .catch(error => {
        toast.error('Error creating subcategory!');
      });
  };

  return (
    <>
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex flex-col">
        <Header />
        <div className="p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Instructor Courses</h1>
            <Link to="/instructor/add-course">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Course
              </button>
            </Link>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 "
              onClick={handleSubCategoryRequest}
            >
              Sub Category Request
            </button>
          </div>
          {showSubCategoryForm && (
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Category
                </label>
                <select
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sub Category
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sub Category Description
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={subCategoryRequest}
                  onChange={handleSubCategoryRequestChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit Request
              </button>
            </form>
          )}
          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map(course => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{course.category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${course.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.is_active ? 'Active' : 'Inactive'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">No</td> {/* Update later with offer logic */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/instructor/courses/${course.id}/edit`}>
                        <button className="bg-yellow-500 text-white px-4 py-1 rounded">
                          Edit
                        </button>
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
    <Footer />
    </>
  );
};
