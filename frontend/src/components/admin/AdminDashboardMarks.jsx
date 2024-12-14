import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboardMarks = () => {
  const [quizResults, setQuizResults] = useState([]);

  // Fetch quiz results from the backend
  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz-admin/quiz-results');
        setQuizResults(response.data.quizResults);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    fetchQuizResults();
  }, []);

  // Handle quiz result deletion
  const deleteQuizResult = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/quiz-admin/quiz-results/${id}`);
      setQuizResults((prevResults) => prevResults.filter((result) => result._id !== id));
      alert('Quiz result deleted successfully.');
    } catch (error) {
      console.error('Error deleting quiz result:', error);
      alert('Failed to delete quiz result.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-teal-100 to-teal-300 shadow-2xl rounded-lg">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-teal-900 drop-shadow-lg">Admin Dashboard - Marks</h1>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-teal-700">
            <tr>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">USN</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Quiz Title</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Marks</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Correct Answers</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Wrong Answers</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Total Questions</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
              <th className="border px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizResults.map((result, index) => (
              <tr
                key={result._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-teal-50 transition duration-300 ease-in-out`}
              >
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{result.usn}</td>
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{result.quizTitle}</td>
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{result.marks}</td>
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{result.correctAnswers}</td>
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{result.wrongAnswers}</td>
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{result.totalQuestions}</td>
                <td className="border px-6 py-4 text-sm font-semibold text-gray-800">{new Date(result.date).toLocaleString()}</td>
                <td className="border px-6 py-4">
                  <button
                    onClick={() => deleteQuizResult(result._id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md transition duration-200 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardMarks;
