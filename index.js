// Import the Express framework to create a server
const express = require('express');

// Import the database configuration to establish a connection with MongoDB
const db = require('./config/connection');

// Import routes to be used by the Express application
const routes = require('./routes');

// Get the current working directory (CWD) to determine the project's root directory
const cwd = process.cwd();

// Define the port on which the Express server will listen. Use the environment's PORT variable or default to 3001 if not set.
const PORT = process.env.PORT || 3001;

// Initialise the Express application
const app = express();

// Determine the specific activity or part of the project the server is running for, based on the CWD.
// This is useful for debugging or when running multiple servers for different parts of a larger project.
const activity = cwd.includes('bootcamp') ? cwd.split('bootcamp')[1] : cwd;

// Middleware to parse URL-encoded data with the querystring library
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Use the imported routes for the application
app.use(routes);

// Once the database connection is open, start the server listening on the defined PORT.
// Log a message to the console indicating which part of the application the server is running for and on which port.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
