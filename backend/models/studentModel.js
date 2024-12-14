const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  sem: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  cgpa: { type: Number, required: true },
  phone: { type: String, required: true },
  branch: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String }, // New field for the photo
}, { timestamps: true });

// Hash the password before saving
studentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
