const { compareExpressions } = require("../services/mathValidationService");

function validateExpression(req, res) {
  const { userAnswer, correctAnswer } = req.body;

  const isCorrect = compareExpressions(userAnswer, correctAnswer);

  res.json({ isCorrect });
}

module.exports = { validateExpression };
