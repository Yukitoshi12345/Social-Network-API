// Import the Express router function to create route handlers.
const router = require('express').Router();

// Import the thought routes module, which contains routes related to thoughts.
const thoughtRoutes = require('./thoughtRoutes');

// Import the user routes module, which contains routes related to users.
const userRoutes = require('./userRoutes');

// Use the thought routes for any request that begins with '/thoughts'. This means any route defined in thoughtRoutes will be prefixed with '/thoughts'.
router.use('/thoughts', thoughtRoutes);

// Similarly, use the user routes for any request that begins with '/users'. This means any route defined in userRoutes will be prefixed with '/users'.
router.use('/users', userRoutes);

// Export the router. This makes it available for import in other files, such as your main server file, enabling these defined routes to be used by the Express application.
module.exports = router;
