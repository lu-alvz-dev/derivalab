const express = require("express");

const router = express.Router();

const { getHistory } = require("../controllers/historyController");

const { authenticate } = require("../middlewares/authMiddleware");

router.get("/", authenticate, getHistory);

module.exports = router;
