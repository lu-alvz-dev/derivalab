const express = require("express");
const router = express.Router();

const { validateExpression } = require("../controllers/validationController");

router.post("/", validateExpression);

module.exports = router;
