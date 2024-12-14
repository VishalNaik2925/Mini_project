import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''], // 4 options
      correctAnswer: '',
    },
  ]);
  const [quizzes, setQuizzes] = useState([]); // State to store fetched quizzes
  const [selectedQuizId, setSelectedQuizId] = useState(null); // Track which quiz is currently expanded

  // Handle input changes for creating a quiz
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleCreateQuiz = async () => {
    try {
      const quizData = { title, questions };
      await axios.post('http://localhost:5000/api/quiz/create-quiz', quizData);
      alert('Quiz created successfully');
      setTitle(''); // Clear quiz title
    setQuestions([ // Reset the questions state to default
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ]);
      fetchQuizzes(); // Refresh the quiz list after creation
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  // Function to fetch quizzes from the server
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetch-quiz');
      setQuizzes(response.data.quizzes); // Store fetched quizzes in state
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      alert('Failed to fetch quizzes. Please try again later.');
    }
  };

  // Function to delete a quiz
  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:5000/api/quiz/${quizId}`);
      alert('Quiz deleted successfully');
      
      fetchQuizzes(); // Refresh the quiz list after deletion
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz. Please try again later.');
    }
  };

  // Fetch quizzes when the component mounts
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Quiz Management</h1>

      {/* Quiz Title Input */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quiz title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      {/* Questions */}
      {questions.map((question, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md bg-white shadow-sm">
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter question ${index + 1}`}
            value={question.questionText}
            onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
          />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              />
            </div>
          ))}
          <input
            type="text"
            className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the correct answer"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
          />
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleAddQuestion}
        >
          Add Another Question
        </button>
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          onClick={handleCreateQuiz}
        >
          Create Quiz
        </button>
      </div>

      {/* Display Fetched Quizzes */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Existing Quizzes</h2>
        {quizzes.length > 0 ? (
          <ul className="space-y-6">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="p-4 border rounded-md bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{quiz.title}</h3>
                    <p className="text-gray-600">{quiz.questions.length} questions</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                      onClick={() =>
                        setSelectedQuizId(selectedQuizId === quiz._id ? null : quiz._id)
                      } // Toggle quiz details
                    >
                      {selectedQuizId === quiz._id ? 'Close' : 'Open'}
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteQuiz(quiz._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Show quiz details if this quiz is selected */}
                {selectedQuizId === quiz._id && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    {quiz.questions.map((question, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-semibold">
                          Question {index + 1}: {question.questionText}
                        </h4>
                        <ul className="list-disc list-inside ml-4">
                          {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>{option}</li>
                          ))}
                        </ul>
                        <p className="text-green-600 font-bold">
                          Correct Answer: {question.correctAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes available</p>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
