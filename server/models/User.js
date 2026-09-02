const mongoose = require('mongoose');

// 1. Define the Schema (Structure)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Request will fail if 'name' is missing
  },
  email: {
    type: String,
    required: true,
    unique: true // Prevents two users from registering with the same email
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// 2. Export the Model
module.exports = mongoose.model('User', userSchema);
