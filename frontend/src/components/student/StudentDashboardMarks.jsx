import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboardMarks = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usn = sessionStorage.getItem('usn'); // Retrieve USN from sessionStorage

    if (!usn) {
      alert('USN is missing. Please log in again.');
      window.location.href = '/login'; // Redirect if USN is missing
      return;
    }

    fetchQuizResults(usn);
  }, []);

  // Fetch quiz results from the backend
  const fetchQuizResults = async (usn) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mark/quiz-results/${usn}`);
      console.log("Quiz Results Data:", response.data);  // Log the response data for debugging
      setQuizResults(response.data.quizResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      setError('Failed to load quiz results.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading quiz results...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Quiz Results</h1>

      {quizResults.length > 0 ? (
        <ul className="space-y-4">
          {quizResults.map((result, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-md hover:shadow-md">
              <h3 className="text-lg font-semibold">{result.quizTitle}</h3>
              <p className="text-md">Marks: {result.marks}/{result.totalQuestions}</p>
              <p className="text-md">Correct Answers: {result.correctAnswersCount}</p>
              <p className="text-md">Wrong Answers: {result.wrongAnswersCount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quiz results available.</p>
      )}
    </div>
  );
};

export default StudentDashboardMarks;
