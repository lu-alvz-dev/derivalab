const express = require("express");

const router = express.Router();

const { getStats } = require("../controllers/statsController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/", authenticate, getStats);

module.exports = router;
