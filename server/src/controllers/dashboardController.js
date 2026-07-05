const {
  getTeacherDashboard,
  getAccuracyOverTime,
  getMostCommonErrors,
  getExercisesByDifficulty,
} = require("../services/dashboardService");

async function getDashboard(req, res) {
  try {
    const teacherId = req.user.userId;
    const dashboard = await getTeacherDashboard(teacherId);

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
    const teacherId = req.user.userId;
    const data = await getAccuracyOverTime(teacherId);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Accuracy chart error",
    });
  }
}

async function getErrorsChart(req, res) {
  try {
    const teacherId = req.user.userId;
    const data = await getMostCommonErrors(teacherId);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Errors chart error",
    });
  }
}

async function getDifficultyChart(req, res) {
  try {
    const teacherId = req.user.userId;
    const data = await getExercisesByDifficulty(teacherId);

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
