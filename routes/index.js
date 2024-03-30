// Import Express router
const router = require('express').Router();

// Import API routes from the './api' directory
const apiRoutes = require('./api');

// Mount the API routes on the '/api' path. All API routes will be prefixed with '/api'
router.use('/api', apiRoutes);

// Catch all middleware for any requests that don't match the routes defined above.
// This acts as a simple error handler for undefined routes, sending a 'Wrong Route!' message.
router.use((req, res) => res.send('Wrong Route!'));

// Export the configured router to be used by the Express application.
module.exports = router;
