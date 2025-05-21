const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Create a review
router.post("/", async (req, res) => {
  try {
    const { reviewer, reviewedUser, rating, comment } = req.body;
    const review = new Review({ reviewer, reviewedUser, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
});

// Get reviews for a user
router.get("/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedUser: req.params.userId }).populate("reviewer", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

module.exports = router;
