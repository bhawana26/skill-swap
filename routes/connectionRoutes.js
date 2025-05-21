const express = require("express");
const router = express.Router();
const ConnectionRequest = require("../models/ConnectionRequest");

// Send connection request
router.post("/request", async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const request = new ConnectionRequest({ sender, receiver });
    await request.save();
    res.status(201).json({ message: "Connection request sent", request });
  } catch (error) {
    res.status(500).json({ message: "Error sending request", error });
  }
});

// Accept or Reject request
router.put("/respond/:id", async (req, res) => {
  const { status } = req.body; // accepted or rejected
  try {
    const request = await ConnectionRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Error responding to request", error });
  }
});

// View connections (accepted only)
router.get("/list/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const connections = await ConnectionRequest.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender receiver", "name email");
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching connections", error });
  }
});

// View pending received requests
router.get("/pending/:userId", async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      receiver: req.params.userId,
      status: "pending",
    }).populate("sender", "name");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
});

module.exports = router;
