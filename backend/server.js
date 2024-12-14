const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const placementRoutes = require('./routes/placementRoutes');
const studentRoutes = require('./routes/student');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes for admin login/register
const quizzRoutes = require('./routes/quizRoutes');
const Quiz = require('./models/Quiz');
const quizResultRoutes = require('./routes/quizResultRoutes');
const studentLogout = require('./routes/student');
const eventRoutes = require('./routes/eventRoutes');
const alumniRoutes = require("./routes/alumniRoutes");
const videoRoutes = require("./routes/videoRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create the upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads', 'profilePhotos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with a timestamp
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow DELETE
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection failed', err));

// Handle preflight requests
app.options('*', cors());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the routes
app.use('/api', placementRoutes);  // Prefix `/api` for placement-related routes
app.use('/api/auth', authRoutes);  // Prefix `/api/auth` for admin authentication routes
app.use('/api/student', studentRoutes);
app.use('/api/quiz', quizzRoutes);
app.use('/api/mark', quizResultRoutes);
app.use('/api/student-logout', studentLogout);
app.use("/api/detail", studentRoutes);
app.use('/api/quiz-admin', quizResultRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/videos", videoRoutes);


// Register route with file upload


// Other routes...
app.get('/api/fetch-quiz', async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // Fetching all quizzes from the database
    res.json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Delete a quiz by ID
app.delete('/api/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id); // Deleting quiz by its ID
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

// Logout route
app.use('/api/logout', (req, res) => {
  try {
    // Perform session cleanup or any logout logic
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
