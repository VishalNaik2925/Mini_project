// backend/routes/eventRoutes.js
// const express = require('express');
// const router = express.Router();
// const Event = require('../models/Event');
// const Student = require('../models/studentModel'); // Assuming you have a Student model
// const sendEmail = require('../utils/emailService'); // Import email service

// router.post('/create', async (req, res) => {
//     try {
//       const { title, description, date, location, createdBy } = req.body;

//       // Save the event in the database
//       const newEvent = new Event({
//         title,
//         description,
//         date,
//         location,
//         createdBy,
//       });
//       await newEvent.save();

//       // Fetch all student emails
//       const students = await Student.find({}, 'email');
//       const studentEmails = students.map((student) => student.email);

//       // Prepare email content
//       const subject = `New Event: ${title}`;
//       const text = `Dear Student,

//   We are excited to announce a new event:

//   Title: ${title}
//   Description: ${description}
//   Date: ${new Date(date).toLocaleDateString()}
//   Location: ${location}

//   We hope to see you there!

//   Best regards,
//   Admin Team`;

//       try {
//         if (studentEmails.length > 0) {
//           await sendEmail(studentEmails.join(', '), subject, text);
//         }
//       } catch (emailError) {
//         console.error('Error sending emails:', emailError);
//         return res.status(201).json({
//           message: 'Event created successfully, but failed to send emails.',
//           event: newEvent,
//         });
//       }

//       // Respond with success
//       res.status(201).json({
//         message: 'Event created successfully and emails sent!',
//         event: newEvent,
//       });
//     } catch (error) {
//       console.error('Error creating event:', error);
//       res.status(500).json({ message: 'Failed to create event.', error: error.message });
//     }
//   });
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Student = require("../models/studentModel"); // Assuming you have a Student model
const sendEmail = require("../utils/emailService"); // Import email service

router.post("/create", async (req, res) => {
  try {
    const { title, description, date, location, createdBy } = req.body;

    // Save the event in the database
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      createdBy,
    });
    await newEvent.save();

    // Fetch all student emails
    const students = await Student.find({}, "email");
    const studentEmails = students.map((student) => student.email);
    console.log("Student emails fetched:", studentEmails); // Debugging student emails

    // Prepare email content
    const subject = `New Event: ${title}`;

    const text = `
Dear Student,

We are excited to announce a new event:

-----------------------------------------------
Title: ${title}
-----------------------------------------------
Description: ${description}

Date: ${new Date(date).toLocaleDateString()}

Location: ${location}

-----------------------------------------------

We hope to see you there!

Best regards,
Admin Team
`;

    if (studentEmails.length > 0) {
      // Send emails individually (optional improvement for detailed logs)
      for (const email of studentEmails) {
        try {
          await sendEmail(email, subject, text);
        } catch (error) {
          console.error(`Failed to send email to: ${email}`, error.message);
        }
      }
    }

    // Respond with success
    res
      .status(201)
      .json({
        message: "Event created successfully and emails sent!",
        event: newEvent,
      });
  } catch (error) {
    console.error("Error creating event or sending emails:", error.message); // Log error
    res
      .status(500)
      .json({
        message: "Failed to create event or send emails.",
        error: error.message,
      });
  }
});

// Example backend route to fetch events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch events from the database
    res.json({ events }); // Return the events in the response
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

module.exports = router;

module.exports = router;
