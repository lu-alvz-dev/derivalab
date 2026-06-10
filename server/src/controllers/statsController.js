const { getStudentStats } = require("../services/statsService");

async function getStats(req, res) {
  try {
    const userId = req.params.userId;

    const stats = await getStudentStats(userId);

    res.json(stats);
  } catch (error) {
    console.error("Stats error:", error);

    res.status(500).json({
      message: "Failed to load statistics",
    });
  }
}

module.exports = {
  getStats,
};
