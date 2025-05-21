const express = require("express");
const router = express.Router();
const skillsList = require("../data/skillsList");

// Search from static skills
router.get("/skills", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const suggestions = skillsList.filter(skill =>
    skill.toLowerCase().includes(query)
  );
  res.json(suggestions);
});

module.exports = router;
