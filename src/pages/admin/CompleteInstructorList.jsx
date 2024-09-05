import React from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import InstructorList from './common/InstructorList';

export const CompleteInstructorList = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex flex-col">
        <Header />
        <div className="flex-grow p-6 bg-gray-100">
          <InstructorList />
        </div>
      </div>
    </div>
  );
};
