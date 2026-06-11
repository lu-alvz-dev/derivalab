const { getExerciseHistory } = require("../services/statsService");

async function getHistory(req, res) {
  try {
    const userId = req.params.userId;

    const history = await getExerciseHistory(userId);

    res.json(history);
  } catch (error) {
    console.error("History error:", error);

    res.status(500).json({
      message: "Failed to load history",
    });
  }
}

module.exports = {
  getHistory,
};
