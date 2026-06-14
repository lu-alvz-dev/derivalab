const express = require("express");

const router = express.Router();

const {
  getTeacherDashboardData,
} = require("../controllers/dashboardController");

router.get("/teacher", getTeacherDashboardData);

module.exports = router;
