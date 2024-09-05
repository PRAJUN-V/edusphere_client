import react from "react"
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { Login } from './pages/authentication/Login'
import { Register } from './pages/authentication/Register'
import { NotFound } from "./pages/pageNotFound/NotFound"
import { Home } from "./pages/user/Home"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { BecomeInstructor } from "./pages/instructor/BecomeInstructor";
import AwaitingApproval from "./pages/instructor/AwaitingApproval";
import { EditInstructorApplication } from "./pages/instructor/EditInstructorApplication";
import { InstructorRequests } from "./pages/admin/InstructorRequests";
import { InstructorDashboard } from "./pages/instructor/InstructorDashboard";
import { CategoryList } from "./pages/admin/CategoryList";
import { InstructorCourses } from "./pages/instructor/InstructorCourses";
import { StudentProfile } from "./pages/user/StudentProfile";
import { InstructorCourseAdd } from "./pages/instructor/courses/InstructorCourseAdd";
import AdminCourses from "./pages/admin/courses/AdminCourses";
import CourseDetails from "./pages/admin/courses/CourseDetails";
import { AllCourses } from "./pages/user/courses/AllCourses";
import CourseDetail from "./pages/user/courses/CourseDetail";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import { InstructorRevenue } from "./pages/instructor/InstructorRevenue";
import { AdminRevenue } from "./pages/admin/AdminRevenue";
import ChatComponent from "./pages/chat/ChatComponent";
import { CompleteInstructorList } from "./pages/admin/CompleteInstructorList";
import { CompleteStudentList } from "./pages/instructor/CompleteStudentList";
import { About } from "./pages/user/About";
import { Contact } from "./pages/user/Contact";
import { InstructorExam } from "./pages/instructor/exam/InstructorExam";
import InstructorCreateExam from "./pages/instructor/exam/InstructorCreateExam";
import InstructorExamDetails from "./pages/instructor/exam/InstructorExamDetails";
import { StudentExam } from "./pages/user/exam/StudentExam";
import { StudentExamDetails } from "./pages/user/exam/StudentExamDetails";
import { InstructorChatroom } from "./pages/instructor/InstructorChatroom";
import { Chat } from "./pages/user/discussion/Chat";
import { AdminChat } from "./pages/admin/AdminChat";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* common routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-exam/:examId/details" element={<StudentExamDetails />} />


        <Route path="/chat/:roomName" element={<ChatComponent />} />



        {/* admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/instructor-requests" element={
          <ProtectedRoute requiredRole="admin">
            <InstructorRequests />
          </ProtectedRoute>
        } />

        <Route path="/admin/category_list" element={
          <ProtectedRoute requiredRole="admin">
            <CategoryList />
          </ProtectedRoute>
        } />

        <Route path="/admin/course_list" element={
          <ProtectedRoute requiredRole="admin">
            <AdminCourses />
          </ProtectedRoute>
        } />

        <Route path="/admin/course-details" element={
          <ProtectedRoute requiredRole="admin">
            <CourseDetails />
          </ProtectedRoute>
        } />

        <Route path="/admin/revenue" element={
          <ProtectedRoute requiredRole="admin">
            <AdminRevenue />
          </ProtectedRoute>
        } />

        <Route path="/admin/instructors" element={
          <ProtectedRoute requiredRole="admin">
            <CompleteInstructorList />
          </ProtectedRoute>
        } />

        <Route path="/admin/chat" element={
          <ProtectedRoute requiredRole="admin">
            <AdminChat />
          </ProtectedRoute>
        } />

        {/* instructor routes */}
        <Route path="/instructor/become_instructor" element={
          <ProtectedRoute requiredRole="instructor">
            <BecomeInstructor />
          </ProtectedRoute>
        } />

        <Route path="/instructor/awaiting-approval" element={
          <ProtectedRoute requiredRole="instructor">
            <AwaitingApproval />
          </ProtectedRoute>
        } />

        <Route path="/instructor/edit-instructor-application" element={
          <ProtectedRoute requiredRole="instructor">
            <EditInstructorApplication />
          </ProtectedRoute>
        } />

        <Route path="/instructor/dashboard" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/instructor/courses" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorCourses />
          </ProtectedRoute>
        } />

        <Route path="/instructor/add-course" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorCourseAdd />
          </ProtectedRoute>
        } />

        <Route path="/instructor/revenue" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorRevenue />
          </ProtectedRoute>
        } />

        <Route path="/instructor/users" element={
          <ProtectedRoute requiredRole="instructor">
            <CompleteStudentList />
          </ProtectedRoute>
        } />

        <Route path="/instructor/exams" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorExam />
          </ProtectedRoute>
        } />

        <Route path="/instructor/create-exam" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorCreateExam />
          </ProtectedRoute>
        } />

        <Route path="/instructor/instructor-exam-details/:examId" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorExamDetails />
          </ProtectedRoute>
        } />

        <Route path="/instructor/chat-room" element={
          <ProtectedRoute requiredRole="instructor">
            <InstructorChatroom />
          </ProtectedRoute>
        } />



        {/* student routes */}
        <Route path="/student/profile" element={
          <ProtectedRoute requiredRole="student">
            <StudentProfile />
          </ProtectedRoute>
        } />

        <Route path="/student/all-course" element={
          <ProtectedRoute requiredRole="student">
            <AllCourses />
          </ProtectedRoute>
        } />

        <Route path="/student/course-detail/:courseId" element={
          <ProtectedRoute requiredRole="student">
            <CourseDetail />
          </ProtectedRoute>
        } />

        <Route path="/student/exam" element={
          <ProtectedRoute requiredRole="student">
            <StudentExam />
          </ProtectedRoute>
        } />

        <Route path="/student/discussion" element={
          <ProtectedRoute requiredRole="student">
            <Chat />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App