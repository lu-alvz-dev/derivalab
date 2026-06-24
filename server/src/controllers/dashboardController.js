const {
  getTeacherDashboard,
  getAccuracyOverTime,
  getMostCommonErrors,
  getExercisesByDifficulty,
} = require("../services/dashboardService");

async function getDashboard(req, res) {
  try {
    const userId = req.user.userId;

    const dashboard = await getTeacherDashboard(userId);

    res.json(dashboard);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Dashboard error",
    });
  }
}

async function getAccuracyChart(req, res) {
  try {
    const userId = req.user.userId;

    const data = await getAccuracyOverTime(userId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Accuracy chart error",
    });
  }
}

async function getErrorsChart(req, res) {
  try {
    const userId = req.user.userId;

    const data = await getMostCommonErrors(userId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Errors chart error",
    });
  }
}

async function getDifficultyChart(req, res) {
  try {
    const userId = req.user.userId;

    const data = await getExercisesByDifficulty(userId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Difficulty chart error",
    });
  }
}

module.exports = {
  getDashboard,
  getAccuracyChart,
  getErrorsChart,
  getDifficultyChart,
};
