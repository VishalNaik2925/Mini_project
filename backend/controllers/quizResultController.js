const QuizResult = require('../models/quizResult');

// Save a quiz result
exports.saveQuizResult = async (req, res) => {
  try {
    const { usn, quizTitle, marks, correctAnswers, wrongAnswers, totalQuestions } = req.body;

    const newQuizResult = new QuizResult({
      usn,
      quizTitle,
      marks,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
    });

    await newQuizResult.save();
    res.status(200).json({ message: 'Quiz result saved successfully!' });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).json({ message: 'Error saving quiz result.' });
  }
};

// Fetch all quiz results (for Admin)
exports.getAllQuizResults = async (req, res) => {
  try {
    const quizResults = await QuizResult.find();
    res.status(200).json({ quizResults });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Error fetching quiz results.' });
  }
};
