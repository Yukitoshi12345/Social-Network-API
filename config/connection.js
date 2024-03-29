// Import the `connect` function and `connection` object from the 'mongoose' package
const { connect, connection } = require('mongoose');

// Establish a connection to the MongoDB database using Mongoose
// The connection URL specifies the use of the local MongoDB instance and targets the 'developersApplications' database
connect('mongodb://127.0.0.1:27017/developersApplications');

// Export the `connection` object so it can be used elsewhere in the application
// This object represents the default connection to the MongoDB database and can be used to listen to events, check the connection status, etc.
module.exports = connection;
