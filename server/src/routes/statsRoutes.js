const express = require("express");

const router = express.Router();

const { getStats } = require("../controllers/statsController");

router.get("/:userId", getStats); //check on semicolon

module.exports = router;
