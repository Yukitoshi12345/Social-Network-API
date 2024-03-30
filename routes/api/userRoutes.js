// Import the express module and create a new router object for defining routes.
const router = require('express').Router();

// Destructure and import various controller functions from the userController file. These functions handle specific API requests.
const {
  getUsers, // Controller function to fetch all users.
  getSingleUser, // Controller function to fetch a single user by their userId.
  createUser, // Controller function to create a new user.
  updateUser, // Controller function to update an existing user's details.
  deleteUser, // Controller function to delete an existing user.
  addFriend, // Controller function to add a friend to a user's friend list.
  deleteFriend, // Controller function to remove a friend from a user's friend list.
} = require('../../controllers/userController');

// Define a route for the base URL '/'. GET requests to this route will invoke the getUsers function to retrieve all users. POST requests will invoke the createUser function to add a new user.
router.route('/').get(getUsers).post(createUser);

// Define a route for '/:userId'. This is a dynamic route where ':userId' is a variable part of the URL.
// GET requests to this route will invoke getSingleUser to fetch a specific user by their ID.
// PUT requests will invoke updateUser to update a specific user's details.
// DELETE requests will invoke deleteUser to remove the user from the database.
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Define a route for '/:userId/friends/:friendId'. This is a dynamic route intended for adding or deleting friends for a user.
// ':userId' and ':friendId' are variable parts of the URL representing the user's ID and the friend's ID, respectively.
// POST requests to this route will invoke addFriend to add a friend to the user's friend list.
// DELETE requests will invoke deleteFriend to remove a friend from the user's friend list.
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Export the router so it can be used in other parts of the application, such as the main server file.
module.exports = router;
