// services/emailService.js
const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your preferred email service
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-email-password'   // replace with your email password or an app password
  }
});

// Function to send an email
exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // replace with your sender email
    to,
    subject,
    text
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
