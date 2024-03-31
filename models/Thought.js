// Importing necessary modules from mongoose
const { Schema, model } = require('mongoose');

// Defining the Reaction schema, used for embedding in the Thought schema
const reactionSchema = new Schema(
  {
    // Unique identifier for each reaction using MongoDB's ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
    },
    // Text content of the reaction, with a maximum length constraint
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Username of the user who made the reaction
    username: {
      type: String,
      required: true,
    },
    // Timestamp for when the reaction was created, defaulting to the current time
    // Getter function to format the date as an ISO string
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => createdAtValue.toISOString(), // Note: Consider reviewing this to ensure the desired format is applied universally
    },
  },
  {
    // Configuration to enable getters on document.toJSON()
    toJSON: {
      getters: true,
    },
    // Disable the creation of an automatic virtual `id` property
    id: false,
  },
);

// Defining the Thought schema
const thoughtSchema = new Schema(
  {
    // Main text content of the thought, with length constraints
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Timestamp for when the thought was created, with default value and formatting
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => createdAtValue.toISOString(), // Note: Same consideration for date formatting as in reactionSchema
    },
    // Username of the user who posted the thought
    username: {
      type: String,
      required: true,
    },
    // Embedding the reactionSchema to enable an array of reactions per thought
    reactions: [reactionSchema],
  },
  {
    // Configuration to enable virtuals and getters in toJSON serialization
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // Disabling the automatic virtual `id` for this schema as well
    id: false,
  },
);

// Defining a virtual property 'reactionCount' that counts the number of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Compiling the Thought schema into a model and exporting it
const Thought = model('thought', thoughtSchema);

// Export the Thought
module.exports = Thought;
