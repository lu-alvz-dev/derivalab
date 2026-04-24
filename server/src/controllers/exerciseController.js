const { getExercise } = require("../services/exerciseService");

function generateExercise(req, res) {
  const { type, difficulty } = req.query;
  const exercise = getExercise(type, difficulty);
  res.json(exercise);
}

module.exports = { generateExercise };
