const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Links this memory directly to the user who created it
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateVisited: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically generates 'createdAt' and 'updatedAt' timestamps
});

module.exports = mongoose.model('Memory', memorySchema);