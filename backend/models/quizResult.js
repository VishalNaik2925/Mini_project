const mongoose = require('mongoose');

// Define the QuizResult schema
const quizResultSchema = new mongoose.Schema({
  usn: { type: String, required: [true, 'USN is required'] },
  quizTitle: { type: String, required: [true, 'Quiz title is required'] },
  marks: { type: Number, required: [true, 'Marks are required'] },
  correctAnswers: { type: Number, default: 0 }, // Count of correct answers
  wrongAnswers: { type: Number, default: 0 }, // Count of wrong answers
  totalQuestions: { type: Number, required: [true, 'Total questions are required'] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
