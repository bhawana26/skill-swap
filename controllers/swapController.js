const SkillSwapRequest = require('../models/SwapRequest');

// Create Swap Request
exports.createSwapRequest = async (req, res) => {
  try {
    const swap = await SkillSwapRequest.create(req.body);
    res.status(201).json(swap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Incoming Requests
exports.getIncomingRequests = async (req, res) => {
  try {
    const requests = await SkillSwapRequest.find({ toUser: req.params.userId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Outgoing Requests
exports.getOutgoingRequests = async (req, res) => {
  try {
    const requests = await SkillSwapRequest.find({ fromUser: req.params.userId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Respond to Request (Accept/Reject)
exports.respondToRequest = async (req, res) => {
  try {
    const request = await SkillSwapRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Swap History
exports.getSwapHistory = async (req, res) => {
  try {
    const history = await SkillSwapRequest.find({
      $or: [
        { fromUser: req.params.userId },
        { toUser: req.params.userId }
      ]
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
