const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema for mongoose - a schema defines the structure of the model
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  // we can pass a 2nd arg (options) - timestamps auto generates timestamps for creation or updates
  { timestamps: true }
);

// create a model (based on the schema) - the model creates an interface to communicate with the database
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
