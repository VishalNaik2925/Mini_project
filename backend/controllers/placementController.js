// controllers/placementController.js
const Placement = require('../models/Placement');  // Import the correct model

// Controller to handle file upload
const addPhoto = async (req, res) => {
  const { description } = req.body;
  const photo = req.file; // The file is accessible via req.file

  if (!photo) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  // Save the photo information in the database
  try {
    const newPlacement = new Placement({
      description,
      imageUrl: `http://localhost:5000/uploads/${photo.filename}`, // Store the full URL for the photo
    });

    await newPlacement.save(); // Save it to MongoDB

    res.status(200).json({
      message: 'File uploaded successfully!',
      data: newPlacement, // Send the saved photo info back
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving photo to database', error });
  }
};

module.exports = { addPhoto };
