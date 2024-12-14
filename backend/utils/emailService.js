const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use your Gmail address
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    // Make sure mailOptions is defined here
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to, // The recipient's email address
      subject, // The subject of the email
      text, // The email content (body)
    };

    // Now send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
