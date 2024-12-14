// backend/models/Video.js
const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
});

module.exports = mongoose.model("Video", VideoSchema);
