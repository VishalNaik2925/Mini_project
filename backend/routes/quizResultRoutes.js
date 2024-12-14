const express = require('express');
const cors = require('cors');
const QuizResult = require('../models/quizResult');
const router = express.Router();

// Use CORS middleware for this router
router.use(cors({
  origin: 'http://localhost:3000', // Allow React app
  methods: ['GET', 'POST', 'DELETE'], // Allow required methods
}));

// Route to save the quiz result
router.post('/submit-quiz', async (req, res) => {
  console.log('Received request body:', req.body); // Debug request body

  const { usn, quizTitle, marks, correctAnswers, wrongAnswers, totalQuestions } = req.body;

  if (!usn || !quizTitle || marks === undefined || correctAnswers === undefined || wrongAnswers === undefined || !totalQuestions) {
    console.error('Validation failed. Missing required fields:', req.body);
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (typeof correctAnswers !== 'number' || typeof wrongAnswers !== 'number') {
    console.error('Validation failed. correctAnswers and wrongAnswers must be numbers.');
    return res.status(400).json({ message: 'Correct Answers and Wrong Answers must be numbers.' });
  }

  try {
    const newResult = new QuizResult({
      usn,
      quizTitle,
      marks,
      correctAnswers,
      wrongAnswers,
      totalQuestions
    });

    const savedResult = await newResult.save();
    res.status(201).json({ message: 'Quiz result saved successfully!', result: savedResult });
  } catch (error) {
    console.error('Error saving quiz result:', error.message);
    res.status(500).json({ message: 'Failed to save quiz result', error: error.message });
  }
});



router.get('/quiz-results', async (req, res) => {
  try {
    const quizResults = await QuizResult.find();
    res.status(200).json({ quizResults });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Error fetching quiz results' });
  }
});

router.delete('/quiz-results/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuizResult = await QuizResult.findByIdAndDelete(id);

    if (!deletedQuizResult) {
      return res.status(404).json({ message: 'Quiz result not found.' });
    }

    res.status(200).json({ message: 'Quiz result deleted successfully.' });
  } catch (error) {
    console.error('Error deleting quiz result:', error);
    res.status(500).json({ message: 'Error deleting quiz result.' });
  }
});

// Backend logic to return quiz results with correct/wrong counts
router.get('/quiz-results/:usn', async (req, res) => {
  try {
    const usn = req.params.usn;

    // Fetch the quiz results for the given USN
    const userResults = await QuizResult.find({ usn });

    // Format the response to include the correct and wrong answers counts
    const resultsWithCounts = userResults.map(result => {
      return {
        quizTitle: result.quizTitle,
        marks: result.marks,
        totalQuestions: result.totalQuestions,
        correctAnswersCount: result.correctAnswers,
        wrongAnswersCount: result.wrongAnswers
      };
    });

    // Send the response
    res.json({ quizResults: resultsWithCounts });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).send('Error fetching quiz results');
  }
});



  

module.exports = router;
