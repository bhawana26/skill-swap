const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
