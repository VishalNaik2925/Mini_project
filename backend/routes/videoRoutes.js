// backend/routes/videoRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Video = require("../models/Video");

const router = express.Router();
const upload = multer({ dest: "uploads/videos/" });

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
});

// Upload new video
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const newVideo = new Video({
      title,
      description,
      url: `/uploads/videos/${req.file.filename}`,
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: "Error uploading video" });
  }
});

module.exports = router;
