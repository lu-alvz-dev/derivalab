const { getTeacherDashboard } = require("../services/dashboardService");

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

module.exports = {
  getDashboard,
};
