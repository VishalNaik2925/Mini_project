const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const Student = require('../models/studentModel');
const { route } = require('./eventRoutes');

const router = express.Router();

// Multer setup for file uploads
const uploadDir = path.join(__dirname, '../uploads/profilePhotos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Register route with profile photo upload
router.post('/register', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { name, usn, year, sem, email, cgpa, phone, branch, password } = req.body;

    if (!name || !usn || !year || !sem || !email || !cgpa || !phone || !branch || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the student already exists
    const existingStudent = await Student.findOne({ usn });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this USN already exists.' });
    }

    // Create a new student object
    const newStudent = new Student({
      name,
      usn,
      year,
      sem,
      email,
      cgpa,
      phone,
      branch,
      password,
      profilePhoto: req.file ? `/uploads/profilePhotos/${req.file.filename}` : null, // Save the file path
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: 'Registration successful!',
      student: {
        usn: savedStudent.usn,
        name: savedStudent.name,
        email: savedStudent.email,
        profilePhoto: savedStudent.profilePhoto, // Include the photo in the response
      },
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







// POST route for student login
router.post('/login', async (req, res) => {
    try {
      const { usn, password } = req.body;
  
      if (!usn || !password) {
        return res.status(400).json({ message: 'USN and password are required.' });
      }
  
      // Find student by USN
      const student = await Student.findOne({ usn });
      if (!student) {
        return res.status(404).json({ message: 'Student not found.' });
      } 
      
  
      // Compare hashed password
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password.' });
      }

      
      // Login successful
      res.status(200).json({
        message: 'Login successful!',
        student: {
          id: student._id,
          name: student.name,
          usn: student.usn,
          email: student.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

  // Get all students with filters
router.get('/students-detail', async (req, res) => {
  try {
    const { year, cgpa } = req.query;  // Extract filters from query params

    // Build the filter query
    const filter = {};
    if (year) filter.year = year;
    if (cgpa) {
      if (cgpa === 'above9') {
        filter.cgpa = { $gt: 9 };
      } else if (cgpa === 'above8') {
        filter.cgpa = { $gt: 8 };
      } else if (cgpa === 'above7') {
        filter.cgpa = { $gt: 7 };
      } else if (cgpa === 'below7') {
        filter.cgpa = { $lt: 7 };
      }
    }

    const students = await Student.find(filter);  // Apply filters
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Backend route example in Express.js
router.get('/students-detail/:usn', async (req, res) => {
  const { usn } = req.params;

  try {
    // Use findOne to get a single student by usn
    const student = await Student.findOne({ usn });

    if (student) {
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).send('Internal Server Error');
  }
});



  router.post('/logout', (req, res) => {
  try {
    // If using server-side sessions, destroy the session (if applicable)
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to log out' });
        }
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    } else {
      // If not using server-side sessions, simply send a success message
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

module.exports = router;
