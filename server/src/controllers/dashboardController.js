const { getTeacherDashboard } = require("../services/dashboardService");

async function getTeacherDashboardData(req, res) {
  try {
    const dashboardData = await getTeacherDashboard();

    res.json(dashboardData);
  } catch (error) {
    console.error("Teacher dashboard error:", error);

    res.status(500).json({
      message: "Failed to load teacher dashboard",
    });
  }
}

module.exports = {
  getTeacherDashboardData,
};
