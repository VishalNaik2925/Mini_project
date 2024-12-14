// routes/placementRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Placement = require('../models/Placement');
const placementController = require('../controllers/placementController');  // Import the controller

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  },
});

// Set up multer middleware
const upload = multer({ storage: storage });
router.get('/placements', async (req, res) => {
  try {
    const placements = await Placement.find(); // Retrieve all photos from the database
    res.status(200).json(placements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error });
  }
});
router.delete('/placement-drive/:id', async (req, res) => {
  console.log('Deleting photo with id:', req.params.id);  // Log the received ID
  try {
    const { id } = req.params;
    const placement = await Placement.findByIdAndDelete(id);

    if (!placement) {
      console.log('No photo found with this ID');
      return res.status(404).json({ message: 'Photo not found' });
    }

    console.log('Photo deleted:', placement);
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ message: 'Error deleting photo' });
  }
});


// POST route for uploading photos
router.post('/placement-drive', upload.single('photo'), placementController.addPhoto); // Use the controller

module.exports = router;
