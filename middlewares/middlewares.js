const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey123');
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to verify admin role
const adminMiddleware = (req, res, next) => {
  if (req.user.isAdmin === 1) {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, return an unauthorized response
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = { authMiddleware, adminMiddleware };
