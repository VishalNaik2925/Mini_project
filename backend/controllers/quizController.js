// controllers/quizController.js
const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    // Create a new quiz document without linking the admin user
    const newQuiz = new Quiz({
      title,
      questions,
    });

    await newQuiz.save();  // Save the quiz to the database
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating quiz', error: error.message });
  }
};



module.exports = { createQuiz };
