const express = require('express');
const router = express.Router();
const { createQuiz } = require('../controllers/quizController'); // Ensure correct import

// Ensure that createQuiz is a valid function
router.post('/create-quiz', createQuiz); // This should be a function, not an object


module.exports = router;
