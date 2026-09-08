const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Links this trip to the user who created it
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  description: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Trip', tripSchema);