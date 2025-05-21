const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const SupportTicket = require("../models/SupportTicket");

// 🔹 Submit feedback
router.post("/feedback", async (req, res) => {
  try {
    const { user, message } = req.body;
    const feedback = new Feedback({ user, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
});

// 🔹 Create support ticket
router.post("/ticket", async (req, res) => {
  try {
    const { user, subject, description } = req.body;
    const ticket = new SupportTicket({ user, subject, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error creating ticket", error });
  }
});


// 🔹 Admin: Close a ticket
router.put("/ticket/:id/close", async (req, res) => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status: "closed" },
      { new: true }
    );
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error closing ticket", error });
  }
});



module.exports = router;
