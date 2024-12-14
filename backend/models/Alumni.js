const mongoose = require("mongoose");

const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  linkedin: { type: String, required: true },
  github: { type: String, required: true },
  batch: { type: String, required: true },
  company: { type: String, required: true }, // Ensure 'company' is required
});

module.exports = mongoose.model("Alumni", AlumniSchema);
    