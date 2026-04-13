const math = require("mathjs");

//Normalize common math input variations
const { normalizeExpression } = require("../utils/mathUtils");

//Compare two expressions mathematically
function compareExpressions(expr1, expr2) {
  try {
    const normalized1 = normalizeExpression(expr1);
    const normalized2 = normalizeExpression(expr2);

    const simplified1 = math.simplify(normalized1).toString();
    const simplified2 = math.simplify(normalized2).toString();

    return simplified1 === simplified2;
  } catch (error) {
    console.error("Math comparison error:", error);
    return false;
  }
}

module.exports = {
  compareExpressions,
};
