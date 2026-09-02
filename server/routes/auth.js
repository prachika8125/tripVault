const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Endpoint: POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // Extract name, email, and password from the incoming request body
    const { name, email, password } = req.body;

    // 1. Check if a user with this email already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Generate a "salt" (random security string) and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create a new User document using the model
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // 4. Save the user document into MongoDB
    await newUser.save();

    // 5. Respond with HTTP Status 201 (Created) and a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // If an error occurs, send back HTTP Status 500 (Internal Server Error)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;