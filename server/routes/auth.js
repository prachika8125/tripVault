const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


// Post /api/auth/login
router.post('/login', async (req, res) => {
  try {
    //Extract email and password from the request body
    const { email, password } = req.body;
    // 1. Check if a user with this email exists in MongoDB
    const user= await User.findOne({ email });
    //If user does not exist, return a 400 status with an error message
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  //Compare the provided password with the hashed password stored in the database
  const isMatch = await bcrypt.compare(password, user.password);
  //If the passwords do not match, return a 400 status with an error message
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  //If the passwords match, generate a JWT token
  const token = jwt.sign({ userId: user._id }, //payload: userId, which can be used to identify the user from MongoDB
     process.env.JWT_SECRET, //the secret key to sign the token
      { expiresIn: '1h' }); //The token will expire in 1 hour


  //Return the token and user information to the client on successful login
  res.json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
} catch (err) {
  res.status(500).json({ message: 'Server error', error: err.message });
}
});

// GET /api/auth/me (Protected Route)
// Notice how authMiddleware is passed as the second argument
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Search the database using the ID injected by the middleware
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;