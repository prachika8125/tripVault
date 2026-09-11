const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/trips - Create a new trip
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating } = req.body;

    const newTrip = new Trip({
      user: req.userId, // Injected securely by authMiddleware
      title,
      destination,
      startDate,
      endDate,
      description,
      rating
    });

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create trip', error: err.message });
  }
});

// GET /api/trips - Get all trips for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userTrips = await Trip.find({ user: req.userId }).sort({ startDate: -1 });
    res.json(userTrips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
});

// GET /api/trips/:id - Get a single trip by ID (owner only)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized to view this trip' });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trip', error: err.message });
  }
});

// PUT /api/trips/:id - Update a specific trip
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized to edit this trip' });
    }

    trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after', runValidators: true }
    );

    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update trip', error: err.message });
  }
});

// DELETE /api/trips/:id - Delete a specific trip
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this trip' });
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete trip', error: err.message });
  }
});

module.exports = router;