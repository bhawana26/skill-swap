const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const SupportTicket = require("../models/SupportTicket");


// ✅ Submit Feedback
router.post("/feedback", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const feedback = new Feedback({ userId, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
});


// ✅ Raise a Support Ticket
router.post("/support", async (req, res) => {
  try {
    const { userId, subject, description } = req.body;
    const ticket = new SupportTicket({ userId, subject, description });
    await ticket.save();
    res.status(201).json({ message: "Support ticket created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating ticket", error });
  }
});


// ✅ Admin: View All Feedback
router.get("/admin/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
});


// ✅ Admin: View All Support Tickets
router.get("/admin/tickets", async (req, res) => {
  try {
    const tickets = await SupportTicket.find().populate("userId", "name");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error });
  }
});


// ✅ Admin: Update Ticket Status
router.put("/admin/ticket/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket status", error });
  }
});

module.exports = router;
