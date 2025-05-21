const express = require("express");
const router = express.Router();
const SkillSwapRequest = require("../models/SwapRequest");

// 1. Create a swap request
router.post("/request", async (req, res) => {
  try {
    const { sender, receiver, senderSkill, receiverSkill } = req.body;

    const swapRequest = new SkillSwapRequest({
      sender,
      receiver,
      senderSkill,
      receiverSkill,
    });

    await swapRequest.save();
    res.status(201).json(swapRequest);
  } catch (error) {
    res.status(500).json({ message: "Error creating swap request", error });
  }
});

// 2. Get incoming requests for a user
router.get("/incoming/:userId", async (req, res) => {
  try {
    const requests = await SkillSwapRequest.find({ receiver: req.params.userId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incoming requests", error });
  }
});

// 3. Get outgoing requests for a user
router.get("/outgoing/:userId", async (req, res) => {
  try {
    const requests = await SkillSwapRequest.find({ sender: req.params.userId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching outgoing requests", error });
  }
});

// 4. Accept or Reject a request
router.put("/respond/:id", async (req, res) => {
  try {
    const { status } = req.body; // accepted / rejected
    const request = await SkillSwapRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Error responding to request", error });
  }
});

// 5. View swap history for a user
// Get all past completed swaps (status === accepted) for a user
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await SkillSwapRequest.find({
      status: "accepted",
      $or: [
        { sender: req.params.userId },
        { receiver: req.params.userId }
      ]
    }).populate("sender receiver", "name email");
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching swap history", error });
  }
});


module.exports = router;
