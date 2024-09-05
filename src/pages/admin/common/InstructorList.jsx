import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin_api/instructor-list/');
        if (response.ok) {
          const data = await response.json();
          setInstructors(data);
        } else {
          toast.error('Failed to fetch instructors');
        }
      } catch (error) {
        toast.error('Error fetching instructors');
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-5xl p-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Instructor List</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-4">Name</th>
            <th className="border-b-2 p-4">Email</th>
            <th className="border-b-2 p-4">Approved</th>
            <th className="border-b-2 p-4">Approval Date</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td className="border-b p-4">{instructor.user.username}</td>
              <td className="border-b p-4">{instructor.user.email}</td>
              <td className="border-b p-4">
                <span
                  style={{
                    color: instructor.admin_approved ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}
                >
                  {instructor.admin_approved ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="border-b p-4">
                {instructor.admin_approved ? (
                  new Date(instructor.approval_date).toLocaleDateString()
                ) : (
                  'Pending'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default InstructorList;
