// Import Schema and model from mongoose to create schemas and models
const { Schema, model } = require('mongoose');

// Define a regular expression for validating email addresses
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Create a new schema for the user model with various fields and validation rules
const userSchema = new Schema(
  {
    // Define the username field as a string, making it unique, required, and trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Define the email field, make it unique, required, and ensure it matches the defined regex
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegex,
    },
    // Define thoughts as an array of ObjectIds, referencing the 'Thought' model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    // Define friends as an array of ObjectIds, allowing for self-reference to the User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // Modify the toJSON method to include virtuals and getters when converting the document to JSON
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // Disable the generation of the default 'id' virtual field
    id: false,
  },
);

// Define a virtual property 'friendCount' that computes the number of friends by counting the elements in the friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create a model named 'User' using the userSchema
const User = model('user', userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
