// Require necessary modules and model data
const connection = require('../config/connection'); // Connection configuration for the MongoDB database
const { Thought, User } = require('../models'); // Mongoose models for the application
const { thoughts } = require('./thoughtData'); // Seed data for thoughts
const { users } = require('./userData'); // Seed data for users

// Establish a connection to MongoDB and listen for the 'open' event
connection.once('open', async () => {
  console.log('MongoDB connected'); // Log the successful database connection

  try {
    // Clear any existing documents in the User and Thought collections
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Existing data cleared.'); // Confirmation of data clearance

    // Insert the seed user data into the database
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:'); // Log the seeding of users
    // Display the seeded users in a table format in the console
    console.table(
      createdUsers.map((user) => ({
        ID: user._id.toString(), // Display the user ID as a string
        Username: user.username, // Display the username
        Email: user.email, // Display the user email
      })),
    );

    // Initialise an array to store the thoughts that will be created
    let createdThoughts = [];
    // Loop through each thought in the seed data
    for (const thought of thoughts) {
      // Find the user that the thought belongs to
      const user = createdUsers.find(
        (user) => user.username === thought.username,
      );
      if (user) {
        thought.username = user.username; // Assign the username to the thought
      }
      // Create a new Thought document in the database
      const createdThought = await Thought.create(thought);
      // Add the created Thought document to the array
      createdThoughts.push(createdThought);
    }

    console.log('Thoughts seeded:'); // Log the seeding of thoughts
    // Display the seeded thoughts in a table format in the console
    console.table(
      createdThoughts.map((thought) => ({
        ID: thought._id.toString(), // Display the thought ID as a string
        ThoughtText: thought.thoughtText, // Display the text of the thought
        Username: thought.username, // Display the username of the user who created the thought
      })),
    );

    console.log('Database seeded!'); // Log the completion of the database seeding process
  } catch (err) {
    console.error('Seeding error:', err); // Log any errors that occur during the seeding process
  } finally {
    // Close the MongoDB connection
    connection.close().then(() => console.log('MongoDB connection closed.')); // Log the closure of the database connection
  }
});
