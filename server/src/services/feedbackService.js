const { compareExpressions } = require("./mathValidationService");
const { normalizeExpression } = require("../utils/mathUtils");
const math = require("mathjs");

/**
 * Detects if the entire expression has inverted sign
 * Example:
 * correct:  2x + 3
 * user:    -2x - 3
 */
function isGlobalSignError(userExpr, correctExpr) {
  try {
    const user = math.simplify(normalizeExpression(userExpr)).toString();
    const negativeCorrect = math
      .simplify(`-1 * (${normalizeExpression(correctExpr)})`)
      .toString();

    return user === negativeCorrect;
  } catch {
    return false;
  }
}

/**
 * Detects sign errors by term
 * Example:
 * correct: 2x^2 + 3
 * user:    2x^2 - 3
 */
function hasTermSignError(userExpr, correctExpr) {
  try {
    const user = math.simplify(normalizeExpression(userExpr)).toString();
    const correct = math.simplify(normalizeExpression(correctExpr)).toString();

    const uTerms = user.replace(/\s+/g, "").split(/(?=[+-])/);
    const cTerms = correct.replace(/\s+/g, "").split(/(?=[+-])/);

    if (uTerms.length !== cTerms.length) return false;

    for (let i = 0; i < uTerms.length; i++) {
      const uNoSign = uTerms[i].replace(/^[+-]/, "");
      const cNoSign = cTerms[i].replace(/^[+-]/, "");

      if (uNoSign === cNoSign && uTerms[i] !== cTerms[i]) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Detects exponent mismatch
 */
function hasExponentError(userExpr, correctExpr) {
  try {
    const user = normalizeExpression(userExpr);
    const correct = normalizeExpression(correctExpr);

    const exponentPattern = /x(?:\^(\d+))?/g;

    const uExponents = [...user.matchAll(exponentPattern)].map(
      (m) => m[1] || "1",
    );

    const cExponents = [...correct.matchAll(exponentPattern)].map(
      (m) => m[1] || "1",
    );

    if (uExponents.length !== cExponents.length) return false;

    return uExponents.some((exp, i) => exp !== cExponents[i]);
  } catch {
    return false;
  }
}

/**
 * Detects coefficient mismatch while exponent matches
 */
function hasCoefficientError(userExpr, correctExpr) {
  try {
    const user = normalizeExpression(userExpr);
    const correct = normalizeExpression(correctExpr);

    const termPattern = /([+-]?\d*)x(?:\^\d+)?|([+-]?\d+)/g;

    const uTerms = [...user.matchAll(termPattern)].map((m) => m[0]);
    const cTerms = [...correct.matchAll(termPattern)].map((m) => m[0]);

    if (uTerms.length !== cTerms.length) return false;

    for (let i = 0; i < uTerms.length; i++) {
      const uCoeff = parseInt(uTerms[i].match(/^[+-]?\d+/)?.[0] || "1");
      const cCoeff = parseInt(cTerms[i].match(/^[+-]?\d+/)?.[0] || "1");

      const uExp = uTerms[i].includes("^") ? uTerms[i].split("^")[1] : "1";
      const cExp = cTerms[i].includes("^") ? cTerms[i].split("^")[1] : "1";

      if (uExp === cExp && uCoeff !== cCoeff) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Detects wrong trig function:
 * sin instead of cos, or cos instead of sin
 */
function hasTrigFunctionError(userExpr, correctExpr) {
  const user = normalizeExpression(userExpr);
  const correct = normalizeExpression(correctExpr);

  return (
    (correct.includes("cos") && user.includes("sin")) ||
    (correct.includes("sin") && user.includes("cos"))
  );
}

/**
 * Detects wrong inner argument:
 * cos(4x) vs cos(5x)
 */
function hasInnerArgumentError(userExpr, correctExpr) {
  try {
    const trigPattern = /(sin|cos)\(([^)]+)\)/;

    const userMatch = normalizeExpression(userExpr).match(trigPattern);
    const correctMatch = normalizeExpression(correctExpr).match(trigPattern);

    if (!userMatch || !correctMatch) return false;

    return userMatch[2] !== correctMatch[2];
  } catch {
    return false;
  }
}

/**
 * POLYNOMIAL ERROR ANALYSIS
 */
function analyzePolynomialError(userAnswer, correctAnswer) {
  if (isGlobalSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback: "All signs are inverted in your result.",
    };
  }

  if (hasTermSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback: "One or more terms have incorrect signs.",
    };
  }

  if (hasExponentError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "EXPONENT_ERROR",
      feedback: "The exponent is incorrect. Review the power rule.",
    };
  }

  if (hasCoefficientError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "COEFFICIENT_ERROR",
      feedback: "The coefficient is incorrect. Review your multiplication.",
    };
  }

  return {
    isCorrect: false,
    errorType: "UNKNOWN",
    feedback: "The answer is incorrect. Review your derivative steps.",
  };
}

/**
 * POWER ERROR ANALYSIS
 */
function analyzePowerError(userAnswer, correctAnswer) {
  return analyzePolynomialError(userAnswer, correctAnswer);
}

/**
 * TRIG ERROR ANALYSIS
 */
function analyzeTrigError(userAnswer, correctAnswer) {
  if (isGlobalSignError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback: "The sign of the derivative is incorrect.",
    };
  }

  if (hasTrigFunctionError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "TRIG_FUNCTION_ERROR",
      feedback: "The trigonometric derivative function is incorrect.",
    };
  }

  if (hasInnerArgumentError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "INNER_ARGUMENT_ERROR",
      feedback:
        "The inner argument of the trigonometric function is incorrect.",
    };
  }

  if (hasCoefficientError(userAnswer, correctAnswer)) {
    return {
      isCorrect: false,
      errorType: "COEFFICIENT_ERROR",
      feedback: "The coefficient in the derivative is incorrect.",
    };
  }

  return {
    isCorrect: false,
    errorType: "UNKNOWN",
    feedback: "The derivative is incorrect. Review the trigonometric rule.",
  };
}

/**
 * MAIN ENTRY
 */
function analyzeError(userAnswer, correctAnswer, exerciseType) {
  const isCorrect = compareExpressions(userAnswer, correctAnswer);

  if (isCorrect) {
    return {
      isCorrect: true,
      errorType: null,
      feedback: "",
    };
  }

  switch (exerciseType) {
    case "polynomial":
      return analyzePolynomialError(userAnswer, correctAnswer);

    case "power":
      return analyzePowerError(userAnswer, correctAnswer);

    case "trig":
      return analyzeTrigError(userAnswer, correctAnswer);

    default:
      return {
        isCorrect: false,
        errorType: "UNKNOWN",
        feedback: "Unknown exercise type.",
      };
  }
}

module.exports = {
  analyzeError,
};
