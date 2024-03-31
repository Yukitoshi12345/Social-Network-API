const connection = require('../config/connection');
const { Thought, User } = require('../models'); // Adjust the path as necessary
const { thoughts } = require('./thoughtData');
const { users } = require('./userData');

// Creates a connection to MongoDB
connection.once('open', async () => {
  console.log('MongoDB connected');

  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Existing data cleared.');

    // Add users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:');
    console.table(
      createdUsers.map((user) => ({
        ID: user._id.toString(), // Convert ObjectId to string
        Username: user.username,
        Email: user.email,
      })),
    );

    // Add thoughts with a reference to the created users
    let createdThoughts = [];
    for (const thought of thoughts) {
      const user = createdUsers.find(
        (user) => user.username === thought.username,
      );
      if (user) {
        thought.username = user.username; // Ensure the thought is linked to an existing user
      }
      const createdThought = await Thought.create(thought);
      createdThoughts.push(createdThought);
    }

    console.log('Thoughts seeded:');
    console.table(
      createdThoughts.map((thought) => ({
        ID: thought._id.toString(), // Convert ObjectId to string
        ThoughtText: thought.thoughtText,
        Username: thought.username,
      })),
    );

    console.log('Database seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    connection.close().then(() => console.log('MongoDB connection closed.'));
  }
});
