const express = require("express");
const router = express.Router();

const { compareExpressions } = require("../services/mathValidationService");

router.post("/", (req, res) => {
  const { userAnswer, correctAnswer } = req.body;

  const isCorrect = compareExpressions(userAnswer, correctAnswer);

  res.json({ isCorrect });
});

module.exports = router;
