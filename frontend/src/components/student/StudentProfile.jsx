import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usn = sessionStorage.getItem('usn');  // Get the USN from sessionStorage

    if (usn) {
      // Fetch the student details based on the USN from the server
      axios.get(`http://localhost:5000/api/detail/students-detail/${usn}`)
        .then((response) => {
          setStudent(response.data);  // Assuming the response contains the student data
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching student details:', error);
          setLoading(false);
        });
    } else {
      console.log('No USN found in sessionStorage');
      setLoading(false);
    }
  }, []); // Empty dependency array to fetch data only once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>No student data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex justify-center items-center">
      <div className="profile-card w-2/6 max-w-3xl bg-white p-8 rounded-3xl shadow-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-3xl">
        <h1 className="text-4xl font-semibold text-center text-blue-700 mb-6 drop-shadow-lg">
          {student.name}'s Profile
        </h1>

        {/* Profile Section */}
        <div className="profile-container flex flex-col items-center space-y-6">
          <img
            src={`http://localhost:5000${student.profilePhoto || '/default-avatar.png'}`}
            alt={student.name}
            className="profile-photo w-40 h-40 object-cover rounded-full mb-4 border-8 border-blue-400 shadow-lg transition-transform transform hover:scale-110"
          />
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{student.name}</h3>
          <div className="text-gray-800 font-medium mb-1 w-full text-center">
            <p className="text-lg text-gray-600">
              <strong>USN:</strong> {student.usn}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Year:</strong> {student.year} - Semester: {student.sem}
            </p>
            <p className="text-lg text-gray-600">
              <strong>CGPA:</strong> {student.cgpa}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Email:</strong> {student.email}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Phone:</strong> {student.phone}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Branch:</strong> {student.branch}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
