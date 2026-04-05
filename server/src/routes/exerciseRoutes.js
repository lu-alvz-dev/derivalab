const express = require("express");
const router = express.Router();

const { getExercise } = require("../services/exerciseService");

router.get("/", (req, res) => {
  const exercise = getExercise();
  res.json(exercise);
});

module.exports = router;
