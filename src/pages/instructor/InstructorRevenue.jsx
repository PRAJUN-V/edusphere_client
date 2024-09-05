// src/components/InstructorDashboard.js
import React from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import Footer from '../user/common/Footer';
import { RevenueInfo } from './RevenueInfo'; // Import the new component

export const InstructorRevenue = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-grow flex flex-col">
          <Header />
          <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Revenue</h1>
            <RevenueInfo />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};