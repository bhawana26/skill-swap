const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// Create a report
router.post("/", async (req, res) => {
  try {
    const { reporter, reportedUser, reason } = req.body;

    const report = new Report({ reporter, reportedUser, reason });
    await report.save();

    res.status(201).json({ message: "Report submitted", report });
  } catch (err) {
    res.status(500).json({ message: "Error creating report", err });
  }
});

// Admin: Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter", "name email")
      .populate("reportedUser", "name email");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports", err });
  }
});

// Admin: Update report status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating report status", err });
  }
});
