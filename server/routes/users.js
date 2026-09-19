const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');

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

module.exports = router;