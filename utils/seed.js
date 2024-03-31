const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

mongoose.connection.on('open', async () => {
  console.log('Connected to the database');

  // Drop existing collections
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Insert sample data
  await User.collection.insertMany(users);
  const insertedThoughtsResult = await Thought.collection.insertMany(thoughts);

  // Update users with thoughts
  const insertedThoughts = insertedThoughtsResult.ops;
  for (let i = 0; i < users.length; i++) {
    await User.findByIdAndUpdate(users[i]._id, {
      $push: { thoughts: insertedThoughts[i]._id },
    });
  }

  // Simulate adding a friend to each user
  for (let i = 0; i < users.length; i++) {
    const friendIndex = (i + 1) % users.length; // Simple way to assign a friend
    await User.findByIdAndUpdate(users[i]._id, {
      $addToSet: { friends: users[friendIndex]._id },
    });
  }

  // Optionally, simulate adding reactions to each thought
  for (let thought of insertedThoughts) {
    const reaction = {
      reactionId: new mongoose.Types.ObjectId(),
      reactionBody: 'This is a great thought!',
      username: 'user2',
      createdAt: new Date(),
    };
    await Thought.findByIdAndUpdate(thought._id, {
      $push: { reactions: reaction },
    });
  }

  console.log('Database seeded!');
  process.exit(0);
});
