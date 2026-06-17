const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");

const { authorize } = require("../middlewares/roleMiddleware");

const {
  getStudentDashboard,
} = require("../controllers/studentDashboardController");

router.get("/", authenticate, authorize("student"), getStudentDashboard);

module.exports = router;
