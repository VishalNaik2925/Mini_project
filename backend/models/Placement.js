// models/Placement.js
const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
});

const Placement = mongoose.model('Placement', placementSchema);

module.exports = Placement;
