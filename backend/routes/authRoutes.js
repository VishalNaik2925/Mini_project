const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/admin/register', registerAdmin);

// Login route
router.post('/admin/login', loginAdmin);

module.exports = router;

