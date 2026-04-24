const express = require("express");
const router = express.Router();
const { generateFeedback } = require("../controllers/feedbackController");

router.post("/", generateFeedback);

module.exports = router;
