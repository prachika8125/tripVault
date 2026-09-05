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
// GET /api/memories - Get all memories for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find all memory documents tied to this specific user's ObjectId
    const userMemories = await Memory.find({ user: req.userId }).sort({ dateVisited: -1 });
    
    // Return the array of memory objects to the client
    res.json(userMemories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch memories', error: err.message });
  }
});


// PUT /api/memories/:id - Update a specific memory
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // 1. Find the exact document by its ID
    let memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // 2. Security checkpoint: Verify the logged-in user owns this document
    if (memory.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized to edit this memory' });
    }

    // 3. Update the document and return the new version ({ new: true })
    memory = await Memory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(memory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update memory', error: err.message });
  }
});

// DELETE /api/memories/:id - Delete a specific memory
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // Security checkpoint: Verify ownership before deletion
    if (memory.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this memory' });
    }

    await Memory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Memory successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete memory', error: err.message });
  }
});


module.exports = router;