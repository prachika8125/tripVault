const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users/:username/profile - Public profile, no auth required
router.get('/:username/profile', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() })
      .select('name username bio');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const trips = await Trip.find({ user: user._id })
      .select('title destination startDate endDate rating coverImage')
      .sort({ startDate: -1 });

    res.json({
      name: user.name,
      username: user.username,
      bio: user.bio,
      trips
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile', error: err.message });
  }
});

// PUT /api/users/profile - Update the logged-in user's own bio/username
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { username, bio } = req.body;

    const updateFields = {};

    if (username !== undefined) {
      const normalizedUsername = username.toLowerCase().trim();

      const existingUser = await User.findOne({ username: normalizedUsername });
      if (existingUser && existingUser._id.toString() !== req.userId) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      updateFields.username = normalizedUsername;
    }

    if (bio !== undefined) {
      updateFields.bio = bio;
    }

    const updatedUser = await User.findByIdAndUpdate(
  req.userId,
  { $set: updateFields },
  { returnDocument: 'after', runValidators: true }
).select('name username bio email');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});


module.exports = router;