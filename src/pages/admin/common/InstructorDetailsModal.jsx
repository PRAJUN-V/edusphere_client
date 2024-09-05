import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineClose } from 'react-icons/ai';

const InstructorDetailsModal = ({ instructor, onClose }) => {
  const [showImage, setShowImage] = useState(null);

  const handleImageClick = (imageType) => {
    setShowImage(imageType);
  };

  const handleCloseImage = () => {
    setShowImage(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Instructor Details</h2>
        <p><strong>ID:</strong> {instructor.id}</p>
        <p><strong>Username:</strong> {instructor.user.username}</p>
        <p><strong>Email:</strong> {instructor.user.email}</p>
        <p><strong>Role:</strong> {instructor.role}</p>
        <p><strong>Description:</strong> {instructor.profile_description}</p>
        <p><strong>Github:</strong> <a href={instructor.github_link} target="_blank" rel="noopener noreferrer">{instructor.github_link}</a></p>
        <p><strong>LinkedIn:</strong> <a href={instructor.linkedin_link} target="_blank" rel="noopener noreferrer">{instructor.linkedin_link}</a></p>
        <p><strong>Address:</strong> {instructor.house_name}, {instructor.post}, {instructor.street}, {instructor.district}, {instructor.state}, {instructor.country}</p>
        <p>
          <strong>ID Proof:</strong>
          <AiOutlineEye size={24} className="inline-block ml-2 cursor-pointer text-blue-500" onClick={() => handleImageClick('id_proof')} />
        </p>
        <p>
          <strong>Qualification Proof:</strong>
          <AiOutlineEye size={24} className="inline-block ml-2 cursor-pointer text-blue-500" onClick={() => handleImageClick('qualification_proof')} />
        </p>

        {showImage && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg relative max-w-[90vw] max-h-[90vh]">
              <button className="absolute top-4 right-4 text-gray-500" onClick={handleCloseImage}>
                <AiOutlineClose size={24} />
              </button>
              <div className="w-full h-full flex justify-center items-center overflow-auto">
                <img
                  src={showImage === 'id_proof' ? instructor.id_proof : instructor.qualification_proof}
                  alt={showImage}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDetailsModal;
