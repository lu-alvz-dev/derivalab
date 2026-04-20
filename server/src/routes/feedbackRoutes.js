const express = require("express");
const router = express.Router();

const { analyzeError } = require("../services/feedbackService");

router.post("/", (req, res) => {
  const { userAnswer, correctAnswer, exerciseType } = req.body;

  const result = analyzeError(userAnswer, correctAnswer, exerciseType);

  res.json(result);
});

module.exports = router;
