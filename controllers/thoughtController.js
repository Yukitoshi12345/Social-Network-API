const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought and push the created thought's _id to the associated user's thoughts array
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true },
      );
      if (!user) {
        return res.status(404).json({ message: 'Associated user not found!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true },
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a thought by its _id and its reference from the associated user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!' });
      }

      // Remove the thought reference from the user's thoughts array
      await User.findByIdAndUpdate(
        { _id: thought.userId }, // Assuming the thought model has a userId field linking it to the user
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true, runValidators: true },
      );

      res.json({
        message: 'Thought and its reference from user removed successfully!',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction stored in a single thought's reactions array
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true },
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID!' });
      }
      res.json({ message: 'Successfully added new reaction!' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  // Pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true, runValidators: true },
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json({ message: 'Reaction removed successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
