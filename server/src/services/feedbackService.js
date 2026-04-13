const { compareExpressions } = require("./mathValidationService");
const { normalizeExpression } = require("../utils/mathUtils");

// normalize for pattern detection only
function normalize(expr) {
  if (!expr) return "";
  return expr.replace(/\s+/g, "");
}

function analyzeError(userAnswer, correctAnswer) {
  const isCorrect = compareExpressions(userAnswer, correctAnswer);

  if (isCorrect) {
    return {
      isCorrect: true,
      feedback: "Correct answer!!",
    };
  }

  const user = normalizeExpression(userAnswer);
  const correct = normalizeExpression(correctAnswer);

  //  Power rule error
  if (correct.match(/^\d+x/) && user.includes("x") && !user.match(/^\d+x/)) {
    return {
      isCorrect: false,
      feedback:
        "It seems you forgot to multiply by the exponent. Review the power rule: d/dx(xⁿ) = n·xⁿ⁻¹",
    };
  }

  //  sign error
  if (correct.includes("-") && !user.includes("-")) {
    return {
      isCorrect: false,
      feedback:
        "Check the signs carefully. You may have missed a negative sign in the derivative.",
    };
  }

  // Possible chain rule error
  if (correct.includes("(") && correct.includes(")") && !user.includes("(")) {
    return {
      isCorrect: false,
      feedback:
        "It looks like you're missing the chain rule. Remember: derivative of f(g(x)) requires multiplying by g'(x).",
    };
  }

  // Trigonometrico error
  if (
    (correct.includes("cos") && user.includes("sin")) ||
    (correct.includes("sin") && user.includes("cos"))
  ) {
    return {
      isCorrect: false,
      feedback:
        "Check your trigonometric derivatives. Remember: d/dx(sin(x)) = cos(x) and d/dx(cos(x)) = -sin(x).",
    };
  }

  // Error by default
  return {
    isCorrect: false,
    feedback:
      "Not quite right. Try simplifying your result and applying derivative rules step by step.",
  };
}

module.exports = {
  analyzeError,
};
