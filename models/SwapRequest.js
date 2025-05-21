const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  senderSkill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true
  },
  receiverSkill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SwapRequest", swapRequestSchema);
