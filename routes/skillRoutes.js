// routes/skillRoutes.js
const express = require("express");
const router = express.Router();
const { createSkill, getAllSkills } = require("../controllers/skillController");

// Create a Skill
router.post("/", createSkill);

// Get All Skills
router.get("/", getAllSkills);

module.exports = router;
// 🚀 Add a skill
// 🚀 Update a skill
router.put("/update/:userId", async (req, res) => {
  try {
    const { oldSkill, newSkill } = req.body;
    const user = await User.findById(req.params.userId);
    const index = user.skills.indexOf(oldSkill);
    if (index === -1) {
      return res.status(404).json({ message: "Skill not found" });
    }
    user.skills[index] = newSkill;
    await user.save();
    res.json({ message: "Skill updated", skills: user.skills });
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
});

// 🚀 Delete a skill
router.delete("/delete/:userId", async (req, res) => {
  try {
    const { skill } = req.body;
    const user = await User.findById(req.params.userId);
    user.skills = user.skills.filter((s) => s !== skill);
    await user.save();
    res.json({ message: "Skill deleted", skills: user.skills });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
});

// 🚀 View Skills
router.get("/view/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ skills: user.skills });
  } catch (error) {
    res.status(500).json({ message: "Error getting skills", error });
  }
});
