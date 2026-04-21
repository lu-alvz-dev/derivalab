const { compareExpressions } = require("./mathValidationService");
const { normalizeExpression } = require("../utils/mathUtils");
const math = require("mathjs");

// Extract polynomial terms dynamically. Example: 20x^4+6 -> [{coeff:20,power:4},{coeff:6,power:0}]
function extractTerms(expr) {
  const normalized = normalizeExpression(expr);

  const terms = normalized.match(/[+-]?[^+-]+/g) || [];

  return terms.map((term) => {
    const match = term.match(/^([+-]?\d*)\*?x(?:\^(\d+))?$/);

    if (match) {
      let coeff = match[1];

      if (coeff === "" || coeff === "+") coeff = 1;
      else if (coeff === "-") coeff = -1;
      else coeff = Number(coeff);

      return {
        coeff,
        power: match[2] ? Number(match[2]) : 1,
      };
    }

    return {
      coeff: Number(term),
      power: 0,
    };
  });
}

// Analyze polynomial term evidence
function analyzePolynomialEvidence(userExpr, correctExpr) {
  try {
    const userTerms = extractTerms(userExpr);
    const correctTerms = extractTerms(correctExpr);

    if (userTerms.length !== correctTerms.length) {
      return null;
    }

    let signErrors = 0;
    let exponentErrors = 0;
    let coefficientErrors = 0;

    for (let i = 0; i < userTerms.length; i++) {
      const u = userTerms[i];
      const c = correctTerms[i];

      if (u.power !== c.power) {
        exponentErrors++;
        continue;
      }

      if (Math.abs(u.coeff) === Math.abs(c.coeff) && u.coeff !== c.coeff) {
        signErrors++;
        continue;
      }

      if (u.coeff !== c.coeff) {
        coefficientErrors++;
      }
    }

    return {
      signErrors,
      exponentErrors,
      coefficientErrors,
    };
  } catch {
    return null;
  }
}

// Detect trig evidence
function analyzeTrigEvidence(userExpr, correctExpr) {
  const user = normalizeExpression(userExpr);
  const correct = normalizeExpression(correctExpr);

  const trigError =
    (correct.includes("cos") && user.includes("sin")) ||
    (correct.includes("sin") && user.includes("cos"));

  const innerPattern = /(sin|cos)\(([^)]+)\)/;

  const userInner = user.match(innerPattern);
  const correctInner = correct.match(innerPattern);

  const innerArgumentError =
    userInner && correctInner && userInner[2] !== correctInner[2];

  return {
    trigError,
    innerArgumentError,
  };
}

// Polynomial classification by evidence
function classifyPolynomialError(evidence) {
  if (!evidence) {
    return {
      isCorrect: false,
      errorType: "UNKNOWN",
      feedback: "The answer structure is incorrect.",
    };
  }

  if (
    evidence.signErrors > 0 &&
    evidence.exponentErrors === 0 &&
    evidence.coefficientErrors === 0
  ) {
    return {
      isCorrect: false,
      errorType: "SIGN_ERROR",
      feedback: "One or more signs are incorrect.",
    };
  }

  if (evidence.exponentErrors > 0) {
    return {
      isCorrect: false,
      errorType: "EXPONENT_ERROR",
      feedback: "The exponent is incorrect. Review the power rule.",
    };
  }

  if (evidence.coefficientErrors > 0) {
    return {
      isCorrect: false,
      errorType: "COEFFICIENT_ERROR",
      feedback: "The coefficient is incorrect. Review your multiplication.",
    };
  }

  return {
    isCorrect: false,
    errorType: "UNKNOWN",
    feedback: "The answer is incorrect.",
  };
}

// Trig classification by evidence
function classifyTrigError(userAnswer, correctAnswer) {
  const trigEvidence = analyzeTrigEvidence(userAnswer, correctAnswer);

  if (trigEvidence.trigError) {
    return {
      isCorrect: false,
      errorType: "TRIG_FUNCTION_ERROR",
      feedback: "The trigonometric derivative function is incorrect.",
    };
  }

  if (trigEvidence.innerArgumentError) {
    return {
      isCorrect: false,
      errorType: "INNER_ARGUMENT_ERROR",
      feedback: "The inner argument is incorrect.",
    };
  }

  const polyEvidence = analyzePolynomialEvidence(userAnswer, correctAnswer);
  return classifyPolynomialError(polyEvidence);
}

// Main entry
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
      return classifyPolynomialError(
        analyzePolynomialEvidence(userAnswer, correctAnswer),
      );

    case "power":
      return classifyPolynomialError(
        analyzePolynomialEvidence(userAnswer, correctAnswer),
      );

    case "trig":
      return classifyTrigError(userAnswer, correctAnswer);

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
