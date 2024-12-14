import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post('http://localhost:5000/api/logout');

      // Clear the USN from sessionStorage
      sessionStorage.removeItem('usn');
      console.log('USN removed from sessionStorage.');

      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl m-10 mx-auto p-8 bg-gradient-to-r from-teal-300 via-blue-500 to-indigo-300 shadow-xl rounded-lg relative overflow-hidden">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Logout
      </button>

      {/* Centered Welcome Block */}
      <div className="flex justify-center items-center mb-8 text-white">
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          Welcome to Your Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Attend Quiz */}
        <Link
          to="/attend-quiz"
          className="block p-8 bg-white text-indigo-500 font-semibold rounded-lg hover:bg-indigo-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">Attend Quiz</h2>
          <p className="text-lg text-center">Prepare and test your knowledge</p>
          <button className="mt-4 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            Start Quiz
          </button>
        </Link>

        {/* View Events */}
        <Link
          to="/student/event-list"
          className="block p-8 bg-white text-teal-500 font-semibold rounded-lg hover:bg-teal-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">View Events</h2>
          <p className="text-lg text-center">Explore upcoming placement drives and more</p>
          <button className="mt-4 px-6 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-all duration-300 ease-in-out">
            See Events
          </button>
        </Link>

        {/* Alumni Interaction */}
        <Link
          to="/student/alumni-interaction"
          className="block p-8 bg-white text-blue-500 font-semibold rounded-lg hover:bg-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">Alumni Interactions</h2>
          <p className="text-lg text-center">Learn from alumni experiences and advice</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
            Interact Now
          </button>
        </Link>

        {/* Profile Page */}
        <Link
          to="/student/profile"
          className="block p-8 bg-white text-gray-500 font-semibold rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">View Profile</h2>
          <p className="text-lg text-center">Update and check your student profile</p>
          <button className="mt-4 px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out">
            View Profile
          </button>
        </Link>

        {/* Quiz Score */}
        <Link
          to="/student/quiz-score"
          className="block p-8 bg-white text-lime-500 font-semibold rounded-lg hover:bg-lime-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">View Quiz Score</h2>
          <p className="text-lg text-center">Check your performance on quizzes</p>
          <button className="mt-4 px-6 py-2 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition-all duration-300 ease-in-out">
            See Scores
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
