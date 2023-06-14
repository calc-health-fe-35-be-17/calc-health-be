const express = require('express');
const app = express();
const authRoutes = require('./api/auth');
const userRoutes = require('./api/users');
const { sequelize } = require('./models'); // Import the sequelize instance

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start the server
// Use PORT provided in environment or default to 3030
const port = process.env.PORT || 3030;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  // ...
});