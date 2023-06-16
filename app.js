const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./cors/cors-option');
const authRoutes = require('./api/auth');
const userRoutes = require('./api/users');
const foodRoutes = require('./api/food');
const cartfoodRoutes = require('./api/cartfood');
const path = require ('path');
const { sequelize } = require('./models'); // Import the sequelize instance

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
// allow origin
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/cartfood', cartfoodRoutes);

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