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
      errorType: null,
      feedback: "",
    };
  }

  const user = normalizeExpression(userAnswer);
  const correct = normalizeExpression(correctAnswer);

  //  Trig error
  if (
    (correct.includes("cos") && user.includes("sin")) ||
    (correct.includes("sin") && user.includes("cos"))
  ) {
    return {
      isCorrect: false,
      errorType: "TRIG_ERROR",
      feedback:
        "Check your trigonometric derivatives. Remember: d/dx(sin(x)) = cos(x) and d/dx(cos(x)) = -sin(x).",
    };
  }

  // Sign error
  if (correct.includes("-") && !user.includes("-")) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "Check the signs carefully. You may have missed a negative sign in the derivative.",
    };
  }

  // Power error
  if (correct.match(/^\d+x/) && user.includes("x") && !user.match(/^\d+x/)) {
    return {
      isCorrect: false,
      errorType: "POWER_RULE",
      feedback: "It seems you forgot to multiply by the exponent.",
    };
  }

  // Chain error
  if (correct.includes("(") && correct.includes(")") && !user.includes("(")) {
    return {
      isCorrect: false,
      errorType: "CHAIN_ERROR",
      feedback: "It looks like you're missing the chain rule.",
    };
  }

  // Error by default
  return {
    isCorrect: false,
    errorType: "UNKNOWN",
    feedback:
      "Not quite right. Try simplifying your result and applying derivative rules step by step.",
  };
}

module.exports = {
  analyzeError,
};
