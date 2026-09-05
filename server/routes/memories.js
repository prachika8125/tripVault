const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/memories - Create a new travel memory
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, location, description, dateVisited } = req.body;

    const newMemory = new Memory({
      user: req.userId, // Injected securely by authMiddleware
      title,
      location,
      description,
      dateVisited
    });

    const savedMemory = await newMemory.save();
    res.status(201).json(savedMemory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create memory', error: err.message });
  }
});

module.exports = router;