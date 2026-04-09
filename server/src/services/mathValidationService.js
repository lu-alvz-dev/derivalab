const math = require("mathjs");

//Normalize common math input variations
function normalizeExpression(expr) {
  if (!expr) return "";

  return expr
    .replace(/\s+/g, "") // remove spaces
    .replace(/²/g, "^2") // x² → x^2
    .replace(/³/g, "^3") // x³ → x^3
    .replace(/–/g, "-"); // weird minus
}

//Compare two expressions mathematically
function compareExpressions(expr1, expr2) {
  try {
    const normalized1 = normalizeExpression(expr1);
    const normalized2 = normalizeExpression(expr2);

    const simplified1 = math.simplify(normalized1);
    const simplified2 = math.simplify(normalized2);

    return simplified1 === simplified2;
  } catch (error) {
    console.error("Math comparison error:", error);
    return false;
  }
}

module.exports = {
  compareExpressions,
};
