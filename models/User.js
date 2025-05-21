// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  experience: {
    type: Number,
    default: 0,
  },
   blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  // In User schema (MongoDB + Mongoose example)
connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Accepted connections
connectionRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Incoming requests
sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Outgoing requests

});

module.exports = mongoose.model("User", UserSchema);
