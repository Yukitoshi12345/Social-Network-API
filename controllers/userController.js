// Import the Thought and User models from the models directory
const { Thought, User } = require('../models');

// Exporting an object containing several asynchronous functions as methods
module.exports = {
  // Retrieves all users from the database and sends them back in the response
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieves a single user by their ID, populating their thoughts and friends in the response
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  // Creates a new user with the request body data and sends the created user back in the response
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Updates a user by their ID with the request body data
  // Sends the updated user data back in the response
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Deletes a user by their ID and also deletes all thoughts associated with that user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that id!' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts._id } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Adds a new friend to a user's friend list and ensures the friendship is mutual
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true },
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with that id!' });
      }

      const friend = await User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true, runValidators: true },
      );
      if (!friend) {
        return res.status(404).json({ message: 'No user found with that id!' });
      }

      res.json({ message: 'Successfully added new friends!' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  // Removes a friend from a user's friend list and ensures this removal is reflected on both sides
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      await User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true, runValidators: true },
      );

      res.json({ message: 'Successfully removed a friend!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
