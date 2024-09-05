import React from 'react'
import { SideBar } from './common/SideBar'
import Header from './common/Header'
import StudentList from './common/StudentList'


export const CompleteStudentList = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex flex-col">
        <Header />
        <div className="flex-grow p-6 bg-gray-100">
          <StudentList />
        </div>
      </div>
    </div>
  )
}
