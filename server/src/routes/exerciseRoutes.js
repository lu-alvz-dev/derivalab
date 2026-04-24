const express = require("express");
const router = express.Router();
const { generateExercise } = require("../controllers/exerciseController");

router.get("/", generateExercise);

module.exports = router;
