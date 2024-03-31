// Import the Thought model from the Thought file
const Thought = require('./Thought');

// Import the User model from the User file
const User = require('./User');

// Exporting the Thought and User models as part of an object
// This allows for easy destructuring when importing these models elsewhere in the application
module.exports = { Thought, User };
