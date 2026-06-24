const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");

const { authorize } = require("../middlewares/roleMiddleware");

const {
  getDashboard,
  getAccuracyChart,
  getErrorsChart,
  getDifficultyChart,
} = require("../controllers/dashboardController");

router.get("/teacher", authenticate, authorize("teacher"), getDashboard);

router.get(
  "/teacher/accuracy",
  authenticate,
  authorize("teacher"),
  getAccuracyChart,
);

router.get(
  "/teacher/errors",
  authenticate,
  authorize("teacher"),
  getErrorsChart,
);

router.get(
  "/teacher/difficulty",
  authenticate,
  authorize("teacher"),
  getDifficultyChart,
);

module.exports = router;
