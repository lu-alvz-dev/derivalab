const express = require("express");
const router = express.Router();

const { getExercise } = require("../services/exerciseService");

// Handle GET requests to generate and return a calculus exercise
router.get("/", (req, res) => {
  const { type, difficulty } = req.query;

  const exercise = getExercise(type, difficulty);

  res.json(exercise);
});

module.exports = router;
