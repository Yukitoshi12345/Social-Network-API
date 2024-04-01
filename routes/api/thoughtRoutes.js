// Import Express and create a router instance
const router = require('express').Router();

// Destructuring to import multiple thought-related controller functions from the thoughtController file
const {
  getThoughts, // Function to get a list of thoughts
  getSingleThought, // Function to get a single thought by its ID
  createThought, // Function to create a new thought
  updateThought, // Function to update an existing thought
  deleteThought, // Function to delete an existing thought
  addReaction, // Function to add a reaction to a thought
  deleteReaction, // Function to delete a reaction from a thought
} = require('../../controllers/thoughtController');

// Define a route for accessing the base URL of thoughts.
// GET request to this route invokes getThoughts to fetch all thoughts.
// POST request to this route invokes createThought to create a new thought.
router.route('/').get(getThoughts).post(createThought);

// Define a route for accessing a thought by its unique ID (thoughtId).
// GET request to this route invokes getSingleThought to fetch a specific thought by ID.
// PUT request to this route invokes updateThought to update a specific thought.
// DELETE request to this route invokes deleteThought to delete a specific thought.
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Define a route for managing reactions to a specific thought identified by thoughtId.
// POST request to this route invokes addReaction to add a reaction to the thought.
// DELETE request to this route invokes deleteReaction to remove a reaction from the thought.
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export the router so it can be integrated with the main application, allowing these routes to be accessible.
module.exports = router;
