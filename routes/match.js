const express = require("express");
const router = express.Router();
const User = require("../models/User");
const matchUsers = require("../utils/matcher");

router.get("/match/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const allUsers = await User.find();

    const matches = matchUsers(currentUser, allUsers);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error matching skills", error });
  }
});

module.exports = router;
