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
const port = process.env.PORT || 3030;

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
