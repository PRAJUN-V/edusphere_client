import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InstructorDetailsModal from './InstructorDetailsModal';

const InstructorReviewList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [actionInstructor, setActionInstructor] = useState(null);
  const [rejectingInstructor, setRejectingInstructor] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin_api/new_instructors/');
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

  const handleAccept = async (instructor) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin_api/accept_instructor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructor_id: instructor.id }),
      });

      if (response.ok) {
        toast.success('Instructor accepted and email sent');
        // Remove the instructor from the list
        setInstructors(instructors.filter(i => i.id !== instructor.id));
      } else {
        toast.error('Error accepting instructor');
      }
    } catch (error) {
      toast.error('Error accepting instructor');
      console.error('Error sending request:', error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin_api/reject_instructor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructor_id: rejectingInstructor.id, reason }),
      });

      if (response.ok) {
        toast.success('Instructor rejected and email sent');
        // Remove the instructor from the list
        setInstructors(instructors.filter(i => i.id !== rejectingInstructor.id));
        setRejectingInstructor(null);
        setReason('');
      } else {
        toast.error('Error rejecting instructor');
      }
    } catch (error) {
      toast.error('Error rejecting instructor');
      console.error('Error sending request:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-5xl p-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Instructor Requests</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-4">ID</th>
            <th className="border-b-2 p-4">Name</th>
            <th className="border-b-2 p-4">Email</th>
            <th className="border-b-2 p-4">Action</th>
            <th className="border-b-2 p-4">View</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td className="border-b p-4">{instructor.id}</td>
              <td className="border-b p-4">{instructor.user.username}</td>
              <td className="border-b p-4">{instructor.user.email}</td>
              <td className="border-b p-4">
                {rejectingInstructor?.id === instructor.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Reason for rejection"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="border p-2 w-full mt-2"
                    />
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                      onClick={handleReject}
                    >
                      Confirm Reject
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleAccept(instructor)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                      onClick={() => setRejectingInstructor(instructor)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
              <td className="border-b p-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setSelectedInstructor(instructor)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
      {selectedInstructor && (
        <InstructorDetailsModal
          instructor={selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
        />
      )}
    </div>
  );
};

export default InstructorReviewList;
