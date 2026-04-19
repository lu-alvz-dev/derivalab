const { compareExpressions } = require("./mathValidationService");
const { normalizeExpression } = require("../utils/mathUtils");
const math = require("mathjs");

// Sign error
function isSignError(userExpr, correctExpr) {
  try {
    const user = math.simplify(userExpr).toString();
    const negativeCorrect = math.simplify(`-1 * (${correctExpr})`).toString();

    return user === negativeCorrect;
  } catch {
    return false;
  }
}

// Sign error by term

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

      // Validates same term but differnt sign
      if (utAbs === ctAbs && ut !== ct) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

// Numeric sign error validation

function detectSignMismatch(userExpr, correctExpr) {
  try {
    const testValues = [1, 2, 3, -1];

    for (let x of testValues) {
      const scope = { x };

      const correctVal = math.evaluate(correctExpr, scope);
      const userVal = math.evaluate(userExpr, scope);

      // Same absolute value but different sign
      if (
        Math.abs(correctVal) === Math.abs(userVal) &&
        correctVal !== userVal
      ) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

// Coeficcient error
function isCoefficientError(userExpr, correctExpr) {
  try {
    const testValues = [1, 2, 3];

    for (let x of testValues) {
      const scope = { x };

      const correctVal = math.evaluate(correctExpr, scope);
      const userVal = math.evaluate(userExpr, scope);

      // Finds coefficient error
      if (Math.abs(correctVal) !== Math.abs(userVal)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

// Exponent mismatch in polynomial terms
function isExponentError(userExpr, correctExpr) {
  try {
    const user = normalizeExpression(userExpr);
    const correct = normalizeExpression(correctExpr);

    // Detect x^n and plain x as exponent 1
    const exponentPattern = /x(?:\^([0-9]+))?/g;

    const userExponents = [...user.matchAll(exponentPattern)].map(
      (m) => m[1] || "1",
    );

    const correctExponents = [...correct.matchAll(exponentPattern)].map(
      (m) => m[1] || "1",
    );

    if (userExponents.length !== correctExponents.length) return false;

    for (let i = 0; i < userExponents.length; i++) {
      if (userExponents[i] !== correctExponents[i]) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

// Error analysis
function analyzeError(userAnswer, correctAnswer) {
  const isCorrect = compareExpressions(userAnswer, correctAnswer);
  //Answer is correct
  if (isCorrect) {
    return {
      isCorrect: true,
      errorType: null,
      feedback: "",
    };
  }

  // Find sign error
  if (isSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "Your result has the correct structure but all signs are inverted.",
    };
  }

  // Sign error by term
  if (hasPartialSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "One or more terms have incorrect signs. Check each term carefully.",
    };
  }

  // Overall sign function mismatch via numeric evaluation
  if (detectSignMismatch(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback:
        "There is a sign mismatch in your result. Check the signs of each term carefully.",
    };
  }

  // Exponent error
  if (isExponentError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "EXPONENT_ERROR",
      feedback:
        "The exponent seems incorrect. Review how the exponent decreases when applying the power rule.",
    };
  }

  // Coefficient error
  if (isCoefficientError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "COEFFICIENT_ERROR",
      feedback:
        "The coefficient is incorrect. Review how you multiply when applying derivative rules.",
    };
  }

  // Trig error
  const user = normalizeExpression(userAnswer);
  const correct = normalizeExpression(correctAnswer);

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

  // Inner function structure error, missing "()""
  if (correct.includes("(") && correct.includes(")") && !user.includes("(")) {
    return {
      isCorrect: false,
      errorType: "STRUCTURE_ERROR",
      feedback:
        'It seems you lost the inner function. Check how the expression is grouped, "()" is missing',
    };
  }

  // Default error
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
