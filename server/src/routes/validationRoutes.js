const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { userAnswer, correctAnswer } = req.body;

  const isCorrect =
    userAnswer.trim().replace(/\s+/g, "") ===
    correctAnswer.trim().replace(/\s+/g, "");

  res.json({ isCorrect });
});

module.exports = router;
