const Admin = require('../models/Admin'); // Import your Admin model

exports.registerAdmin = async (req, res) => {
  const { name, email, phone, password, department } = req.body;

  try {
    const newAdmin = new Admin({
      name,
      email,
      phone,
      password,
      department,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

