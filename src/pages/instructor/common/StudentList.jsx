import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrected the import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructorId, setInstructorId] = useState(null);

  useEffect(() => {
    // Function to get the instructor ID from the JWT token
    const getInstructorIdFromToken = () => {
      try {
        const token = localStorage.getItem('access'); // Get the token from localStorage
        if (token) {
          const decodedToken = jwtDecode(token); // Decode the token
          return decodedToken.user_id; // Assume the instructor's ID is stored as 'user_id' in the token
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      return null;
    };

    const fetchStudents = async (instructorId) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/instructor/student/${instructorId}`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          toast.error('Failed to fetch students');
        }
      } catch (error) {
        toast.error('Error fetching students');
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    // Get the instructor ID and fetch the students
    const id = getInstructorIdFromToken();
    if (id) {
      setInstructorId(id);
      fetchStudents(id);
    } else {
      toast.error('Instructor ID not found');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-5xl p-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Course Enrollment Details</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-4">Name</th>
            <th className="border-b-2 p-4">Email</th>
            <th className="border-b-2 p-4">Course Title</th>
          </tr>
        </thead>
        <tbody>
          {students.map((entry, index) => (
            <tr key={index}>
              <td className="border-b p-4">{entry.student.username}</td>
              <td className="border-b p-4">{entry.student.email}</td>
              <td className="border-b p-4">{entry.course.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default StudentList;
