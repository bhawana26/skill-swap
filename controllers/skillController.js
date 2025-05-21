// controllers/skillController.js
const Skill = require("../models/Skill");

// Create Skill
const createSkill = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const skill = await Skill.create({ name, category, description });
    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSkill, getAllSkills };
