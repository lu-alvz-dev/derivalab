const { analyzeError } = require("../services/feedbackService");

function generateFeedback(req, res) {
  const { userAnswer, correctAnswer, exerciseType } = req.body;
  const result = analyzeError(userAnswer, correctAnswer, exerciseType);
  res.json(result);
}

module.exports = { generateFeedback };
