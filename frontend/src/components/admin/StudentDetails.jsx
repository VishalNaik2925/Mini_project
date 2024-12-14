import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [yearFilter, setYearFilter] = useState('');
  const [cgpaFilter, setCgpaFilter] = useState('');

  useEffect(() => {
    // Fetch students with filters
    axios.get('http://localhost:5000/api/detail/students-detail', {
      params: {
        year: yearFilter,
        cgpa: cgpaFilter,
      },
    })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, [yearFilter, cgpaFilter]); // Re-fetch when filters change

  const handleYearChange = (e) => setYearFilter(e.target.value);
  const handleCgpaChange = (e) => setCgpaFilter(e.target.value);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8"
    >
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8 drop-shadow-lg">
        Student Details
      </h1>

      {/* Filters */}
      <div className="filters mb-8 flex justify-center space-x-4">
        <select
          onChange={handleYearChange}
          value={yearFilter}
          className="p-3 rounded-md shadow-lg border border-gray-300 hover:border-blue-400 transition text-lg font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <select
          onChange={handleCgpaChange}
          value={cgpaFilter}
          className="p-3 rounded-md shadow-lg border border-gray-300 hover:border-blue-400 transition text-lg font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select CGPA</option>
          <option value="above9">Above 9</option>
          <option value="above8">Above 8</option>
          <option value="above7">Above 7</option>
          <option value="below7">Below 7</option>
        </select>
      </div>

      {/* Student Cards */}
      <div className="student-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="student-card bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl max-w-xs w-full border border-gray-100"
          >
            <img
              src={`http://localhost:5000${student.profilePhoto || '/default-avatar.png'}`}
              alt={student.name}
              className="student-photo w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-400 shadow-md"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition">
              {student.name}
            </h3>
            <div className="text-gray-800 font-medium mb-1 w-full">
              <p className="text-sm text-gray-600">
                <strong>USN:</strong> {student.usn}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Year:</strong> {student.year} - Semester: {student.sem}
              </p>
              <p className="text-sm text-gray-600">
                <strong>CGPA:</strong> {student.cgpa}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {student.phone}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Branch:</strong> {student.branch}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
