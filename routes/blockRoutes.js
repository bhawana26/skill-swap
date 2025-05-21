const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Block a user
router.put("/block/:userId", async (req, res) => {
  try {
    const { targetUserId } = req.body;

    const user = await User.findById(req.params.userId);
    if (!user.blockedUsers.includes(targetUserId)) {
      user.blockedUsers.push(targetUserId);
      await user.save();
    }

    res.json({ message: "User blocked successfully", blockedUsers: user.blockedUsers });
  } catch (err) {
    res.status(500).json({ message: "Error blocking user", err });
  }
});

// Unblock a user
router.put("/unblock/:userId", async (req, res) => {
  try {
    const { targetUserId } = req.body;

    const user = await User.findById(req.params.userId);
    user.blockedUsers = user.blockedUsers.filter(
      (id) => id.toString() !== targetUserId
    );
    await user.save();

    res.json({ message: "User unblocked successfully", blockedUsers: user.blockedUsers });
  } catch (err) {
    res.status(500).json({ message: "Error unblocking user", err });
  }
});

// View Blocked Users
router.get("/blocked/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("blockedUsers", "name email");
    res.json(user.blockedUsers);
  } catch (err) {
    res.status(500).json({ message: "Error getting blocked users", err });
  }
});

module.exports = router;
