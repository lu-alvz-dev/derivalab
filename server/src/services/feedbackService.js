const { compareExpressions } = require("./mathValidationService");
const { normalizeExpression } = require("../utils/mathUtils");
const math = require("mathjs");
// normalize for pattern detection only
function normalize(expr) {
  if (!expr) return "";
  return expr.replace(/\s+/g, "");
}

// Validates sign expresion
function isSignError(userExpr, correctExpr) {
  try {
    const user = math.simplify(userExpr).toString();
    const negativeCorrect = math.simplify(`-1 * (${correctExpr})`).toString();

    return user === negativeCorrect;
  } catch (err) {
    return false;
  }
}

//Validates terms signs
function hasPartialSignError(userExpr, correctExpr) {
  try {
    const user = math.simplify(userExpr).toString();
    const correct = math.simplify(correctExpr).toString();

    const uTerms = user.replace(/\s+/g, "").split(/(?=[+-])/);
    const cTerms = correct.replace(/\s+/g, "").split(/(?=[+-])/);

    if (uTerms.length !== cTerms.length) return false;

    for (let i = 0; i < uTerms.length; i++) {
      const ut = uTerms[i];
      const ct = cTerms[i];

      const utAbs = ut.replace(/^[+-]/, "");
      const ctAbs = ct.replace(/^[+-]/, "");

      // mismo término pero distinto signo
      if (utAbs === ctAbs && ut !== ct) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

//Validate numeric values
function detectSignMismatch(userExpr, correctExpr) {
  try {
    // validate different x values
    const testValues = [1, 2, 3, -1];

    let signMismatchDetected = false;

    for (let x of testValues) {
      const scope = { x };

      const correctVal = math.evaluate(correctExpr, scope);
      const userVal = math.evaluate(userExpr, scope);

      // validates absolute value and sign
      if (
        Math.abs(correctVal) === Math.abs(userVal) &&
        correctVal !== userVal
      ) {
        signMismatchDetected = true;
      }
    }

    return signMismatchDetected;
  } catch {
    return false;
  }
}

//Validates power rule
function isPowerRuleError(userExpr, correctExpr) {
  try {
    const testValues = [1, 2, 3];

    for (let x of testValues) {
      const scope = { x };

      const correctVal = math.evaluate(correctExpr, scope);
      const userVal = math.evaluate(userExpr, scope);

      // Si el usuario no escala correctamente con la potencia
      if (Math.abs(userVal) !== Math.abs(correctVal)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

//Error analysis
function analyzeError(userAnswer, correctAnswer) {
  const isCorrect = compareExpressions(userAnswer, correctAnswer);

  if (isCorrect) {
    return {
      isCorrect: true,
      errorType: null,
      feedback: "",
    };
  }

  // expression sign error
  if (isSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "Your result has the correct structure but all signs are inverted.",
    };
  }

  //  Sign error by term
  if (hasPartialSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "One or more terms have incorrect signs. Check each term carefully.",
    };
  }

  // SIGN error dynamic evaluatiopn with mathjs
  if (detectSignMismatch(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "There is a sign mismatch in your result. Check the signs of each term carefully.",
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

  // Power error
  if (isPowerRuleError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "POWER_RULE",
      feedback: "It seems you may have misapplied the power rule.",
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
