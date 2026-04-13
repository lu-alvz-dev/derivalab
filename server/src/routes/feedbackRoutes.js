const express = require("express");
const router = express.Router();

const { analyzeError } = require("../services/feedbackService");

// POST /api/feedback
router.post("/", (req, res) => {
  const { userAnswer, correctAnswer } = req.body;

  const result = analyzeError(userAnswer, correctAnswer);

  res.json(result);
});

module.exports = router;
