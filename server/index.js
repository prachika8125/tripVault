const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth'); // Import auth routes
const memoryRoutes = require('./routes/memories'); // Import travel entry routes
const app = express();

// Middleware to parse JSON and handle cross-origin requests
app.use(express.json());
app.use(cors());

// Mount the route: any request sent to /api/auth/* goes to routes/auth.js
app.use('/api/auth', authRoutes);
// Mount the route: any request sent to /api/memories/* goes to routes/memories.js
app.use('/api/memories', memoryRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
  res.send('TripVault API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));