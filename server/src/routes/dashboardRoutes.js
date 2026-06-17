const express = require("express");

const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");

const { authenticate } = require("../middlewares/authMiddleware");

const { authorize } = require("../middlewares/roleMiddleware");

router.get("/:userId", getDashboard);
router.get("/teacher", authenticate, authorize("teacher"), getDashboard);

module.exports = router;
