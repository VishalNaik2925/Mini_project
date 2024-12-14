import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const handleLogout = () => {
    // Clear sessionStorage or token and redirect to the login page
    sessionStorage.removeItem('usn');
    window.location.href = '/'; // Redirect to the home page or login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 p-8 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-8 right-8 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 shadow-md"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-center text-teal-800 mb-8">Admin Dashboard</h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Create a Quiz */}
        <Link
          to="/admin/create-quiz"
          className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-teal-700">Create a Quiz</h2>
          <p className="text-gray-600 mt-2">
            Design and manage quizzes for students to assess their knowledge.
          </p>
        </Link>

        {/* View Quiz Results */}
        <Link
          to="/admin/dashboard-mark"
          className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-teal-700">View Quiz Results</h2>
          <p className="text-gray-600 mt-2">
            Check and manage the results of all quizzes taken by students.
          </p>
        </Link>

        {/* Manage Placement Drives */}
        <Link
          to="/admin-placement-drive"
          className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-teal-700">Manage Placement Drives</h2>
          <p className="text-gray-600 mt-2">
            Organize and update placement drives for upcoming hiring sessions.
          </p>
        </Link>

        {/* View Students */}
        <Link
          to="/admin/Student-details"
          className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-teal-700">View Students</h2>
          <p className="text-gray-600 mt-2">
            Access and manage student details, including academic performance.
          </p>
        </Link>

        {/* Create Events */}
        <Link
          to="/admin/create-event"
          className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-teal-700">Create Events</h2>
          <p className="text-gray-600 mt-2">
            Plan and organize events such as workshops and alumni meetups.
          </p>
        </Link>

        {/* Alumni Interaction */}
        <Link
          to="/admin/alumni-interaction"
          className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-teal-700">Alumni Interaction</h2>
          <p className="text-gray-600 mt-2">
            Manage alumni details and upload interview videos for student reference.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
