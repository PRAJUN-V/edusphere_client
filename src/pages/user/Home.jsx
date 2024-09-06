import React, { useEffect, useState } from 'react';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import HeroSection from './common/HeroSection';
import Footer from './common/Footer';
import FirstLoginForm from './common/FirstLoginForm';
import api from '../../api';
import { jwtDecode } from 'jwt-decode'; // Correct import
import CategoriesSection from './common/CategoriesSection';
import HomeCourseSection from './common/HomeCourseSection';
import RecentlyAddedCourses from './common/RecentlyAddedCourses';
import TopInstructors from './common/TopInstructors';
import TrustedCompanies from './common/TrustedCompanies';

export const Home = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated and if it's their first login
    const checkUserStatus = async () => {
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        try {
          // Decode the token to get the user ID
          const decodedToken = jwtDecode(accessToken);
          console.log('Decoded Token:', decodedToken); // Debugging
          setUserId(decodedToken.user_id); // Adjust the field name based on your token payload
          console.log(decodedToken.user_id);
          // Fetch user profile
          const response = await api.get(`/student/profiles/${decodedToken.user_id}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const profile = response.data;
          console.log('Profile:', profile); // Debugging

          // Set the first login status
          setIsFirstLogin(profile.first_login);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://edusphere.duckdns.org/student/home-categories/');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    checkUserStatus();
    fetchCategories();
  }, []);

  const handleFormSubmit = () => {
    setIsFirstLogin(false);
  };

  return (
    <>
      <Header />
      <SubHeader />
      {isFirstLogin ? (
        <>
          <FirstLoginForm userId={userId} onSubmit={handleFormSubmit} />
        </>
      ) : (
        <>
          <HeroSection />
          <CategoriesSection categories={categories} /> {/* Pass the categories data */}
          <HomeCourseSection />
          <RecentlyAddedCourses />
          <TopInstructors />
          <TrustedCompanies />
          <Footer />
        </>
      )}
    </>
  );
};
