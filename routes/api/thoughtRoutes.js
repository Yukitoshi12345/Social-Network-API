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

// Route for handling requests to the base URL /api/thoughts; supports GET to list thoughts and POST to create a new thought
router.route('/').get(getThoughts).post(createThought);

// Route for handling requests to a specific thought by ID (/api/thoughts/:thoughtId); supports GET to retrieve a single thought, PUT to update the thought, and DELETE to remove the thought
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Route for handling reactions to a specific thought (/api/thoughts/:thoughtId/reactions); supports POST to add a reaction and DELETE to remove a reaction
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

// Export the router to be used by other parts of the application
module.exports = router;
