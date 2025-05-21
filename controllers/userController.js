// controllers/userController.js
const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, skills } = req.body;
    const user = await User.create({ username, email, skills });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, getAllUsers };
