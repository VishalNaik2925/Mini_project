const express = require("express");
const router = express.Router();
const Alumni = require("../models/Alumni");

// GET all alumni
router.get("/", async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alumni data" });
  }
});

// POST to add new alumni
router.post("/", async (req, res) => {
    const { name, linkedin, github, batch, company } = req.body;
    try {
      console.log("Received new alumni data:", req.body); // Add this log for debugging
      const newAlumni = new Alumni({ name, linkedin, github, batch, company });
      await newAlumni.save();
      res.status(201).json(newAlumni);
    } catch (err) {
      console.error("Error adding alumni:", err);  // Add this line to log the error
      res.status(500).json({ error: "Failed to add alumni" });
    }
  });
  

module.exports = router;
