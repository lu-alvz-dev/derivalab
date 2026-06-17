const { getStudentStats } = require("../services/statsService");

async function getStudentDashboard(req, res) {
  try {
    const stats = await getStudentStats(req.user.userId);

    res.json(stats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
}

module.exports = {
  getStudentDashboard,
};
