import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendQuiz = () => {
  const [quizzes, setQuizzes] = useState([]); // List of quizzes
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Quiz currently being attended
  const [answers, setAnswers] = useState({}); // Student's answers
  const [submitted, setSubmitted] = useState(false); // Submission status
  const [marks, setMarks] = useState(null); // Marks after quiz submission

  useEffect(() => {
    const usn = sessionStorage.getItem('usn');
    console.log('Retrieved USN:', usn); // Debug log to ensure it's retrieved correctly
    if (!usn) {
      alert('USN is missing. Please log in again.');
      window.location.href = '/login'; // Redirect if USN is not found
    }
    // Fetch quizzes on component mount
    fetchQuizzes();
  }, []);

  // Fetch available quizzes from the server
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetch-quiz');
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      alert('Failed to load quizzes. Please try again later.');
    }
  };

  // Handle answer changes
  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    const usn = sessionStorage.getItem('usn'); // Retrieve USN from sessionStorage

    if (!usn) {
      alert('Please log in first.');
      return;
    }

    // Ensure all questions are answered
    const unansweredQuestions = selectedQuiz.questions.filter(
      (_, index) => answers[index] === undefined
    );

    if (unansweredQuestions.length > 0) {
      alert('Please answer all questions before submitting!');
      return;
    }

    // Calculate correct and wrong answers
    const correctAnswersCount = selectedQuiz.questions.reduce((count, question, index) => {
      return question.correctAnswer === answers[index] ? count + 1 : count;
    }, 0);

    const totalQuestions = selectedQuiz.questions.length;
    const wrongAnswersCount = totalQuestions - correctAnswersCount;

    // Prepare quiz data
    const quizData = {
      usn,
      quizTitle: selectedQuiz.title, // Replace with actual quiz title
      marks: correctAnswersCount, // Marks based on correct answers
      correctAnswers: correctAnswersCount,
      wrongAnswers: wrongAnswersCount,
      totalQuestions,
    };

    try {
      // Submit the data to the backend
      const response = await axios.post('http://localhost:5000/api/mark/submit-quiz', quizData);
      console.log('Quiz result saved successfully:', response.data);
      alert('Quiz submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving quiz result:', error.response?.data || error.message);
      alert('Failed to save quiz result.');
    }
  };

  // Calculate Marks based on correct answers
  const calculateMarks = () => {
    let score = 0;
    const correctAnswers = [];
    const wrongAnswers = [];

    selectedQuiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
        correctAnswers.push(question.questionText);
      } else {
        wrongAnswers.push(question.questionText);
      }
    });

    setMarks(score); // Update the state with the calculated marks

    // Save the result to the backend
    saveQuizResult(score, correctAnswers, wrongAnswers);
  };

  // Send quiz result to the backend
  const saveQuizResult = async (marks, correctAnswers, wrongAnswers) => {
    const usn = sessionStorage.getItem('usn'); // Retrieve USN from session storage

    console.log('Retrieved USN:', usn); // Debug log for USN

    // Check if USN is missing
    if (!usn) {
      console.error('USN is missing!');
      alert('USN is not available. Please log in again.');
      return;
    }

    const resultData = {
      usn,
      quizTitle: selectedQuiz?.title || 'Untitled Quiz',
      marks,
      correctAnswers,
      wrongAnswers,
      totalQuestions: selectedQuiz?.questions?.length || 0,
    };

    console.log('Data being sent to backend:', resultData); // Log the payload

    try {
      const response = await axios.post('http://localhost:5000/api/mark/submit-quiz', resultData);
      alert('Quiz result submitted successfully!');
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error saving quiz result:', error.response?.data || error.message);
      alert('Failed to submit quiz result. Please try again.');
    }
  };

  return (
    <div className="m-8 max-w-3xl mx-auto p-6 bg-blue-500 shadow-xl rounded-xl">
      <h1 className="text-3xl font-semibold mb-6 text-white text-center">Attend a Quiz</h1>

      {/* Display quizzes list */}
      {!selectedQuiz && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Available Quizzes</h2>
          {quizzes.length > 0 ? (
            <ul className="space-y-4">
              {quizzes.map((quiz) => (
                <li
                  key={quiz._id}
                  className="p-4 border-2 border-teal-300 rounded-lg bg-white hover:bg-teal-50 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <h3 className="text-xl font-bold text-blue-700">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.questions.length} questions</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No quizzes available at the moment.</p>
          )}
        </div>
      )}

      {/* Display selected quiz */}
      {selectedQuiz && !submitted && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">{selectedQuiz.title}</h2>
          {selectedQuiz.questions.map((question, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-medium mb-2 text-white">
                Q{index + 1}: {question.questionText}
              </h3>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block mb-2 cursor-pointer text-white">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}

          <div className="flex justify-between">
            <button
              className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
              onClick={() => setSelectedQuiz(null)}
            >
              Back to Quizzes
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}

      {/* Show marks after quiz submission */}
      {submitted && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-500">
            Quiz Submitted Successfully!
          </h2>
          <button
            className="mt-4 bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600 transition duration-300"
            onClick={() => {
              setSelectedQuiz(null);
              setAnswers({});
              setSubmitted(false);
              setMarks(null); // Reset marks for next quiz
            }}
          >
            Back to Quiz List
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendQuiz;
