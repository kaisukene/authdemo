const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('../services/emailService');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Loo JWT token (kehtib nt 1h)
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Saada lähtestamise e-kiri
    sendResetEmail(email, token);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;

  try {
    // Verifitseeri token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.userId;

    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hashi uus paroollisa selle funktsiooni jaoks ka htlmi nupp
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Uuenda kasutaja parool
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token', error: error.message });
  }
};
