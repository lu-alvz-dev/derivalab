const { analyzeError } = require("../services/feedbackService");
const { saveAttempt } = require("../services/statsService");

async function generateFeedback(req, res) {
  try {
    const {
      userId,
      question,
      userAnswer,
      correctAnswer,
      exerciseType,
      difficulty,
    } = req.body;

    const result = analyzeError(userAnswer, correctAnswer, exerciseType);

    await saveAttempt({
      userId,
      question,
      correctAnswer,
      userAnswer,
      exerciseType,
      difficulty,
      isCorrect: result.isCorrect,
      errorType: result.errorType,
    });

    res.json(result);
  } catch (error) {
    console.error("Feedback generation error:", error);

    res.status(500).json({
      message: "Failed to process feedback",
    });
  }
}

module.exports = {
  generateFeedback,
};
