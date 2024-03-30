const { Thought, User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

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
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

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

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that id!' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

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
      //adding the user as a friend to the friend
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

  // Remove Friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      // Optionally, you might want to remove the userId from the friend's friends array as well
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
