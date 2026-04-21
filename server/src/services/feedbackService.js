const { compareExpressions } = require("./mathValidationService");
const { normalizeExpression } = require("../utils/mathUtils");
const math = require("mathjs");

// Extract polynomial terms dynamically. Example: 20x^4+6 -> [{coeff:20,power:4},{coeff:6,power:0}]
function extractTerms(expr) {
  try {
    const normalized = normalizeExpression(expr);
    const node = math.parse(normalized);

    const terms = [];

    function walk(n, sign = 1) {
      if (n.type === "OperatorNode" && n.op === "+") {
        walk(n.args[0], sign);
        walk(n.args[1], sign);
        return;
      }

      if (n.type === "OperatorNode" && n.op === "-") {
        walk(n.args[0], sign);
        walk(n.args[1], -sign);
        return;
      }

      let coeff = sign;
      let power = 0;

      if (n.type === "OperatorNode" && n.op === "*") {
        n.args.forEach((arg) => {
          if (arg.type === "ConstantNode") {
            coeff *= Number(arg.value);
          }

          if (arg.type === "SymbolNode" && arg.name === "x") {
            power = 1;
          }

          if (arg.type === "OperatorNode" && arg.op === "^") {
            if (arg.args[0].type === "SymbolNode" && arg.args[0].name === "x") {
              power = Number(arg.args[1].value);
            }
          }
        });
      } else if (n.type === "SymbolNode" && n.name === "x") {
        coeff = sign;
        power = 1;
      } else if (n.type === "OperatorNode" && n.op === "^") {
        coeff = sign;
        power = Number(n.args[1].value);
      } else if (n.type === "ConstantNode") {
        coeff = sign * Number(n.value);
        power = 0;
      }

      terms.push({ coeff, power });
    }

    walk(node);

    return terms;
  } catch {
    return [];
  }
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

  const trigPattern = /(sin|cos)\(([^)]+)\)/;

  const userTrig = user.match(trigPattern);
  const correctTrig = correct.match(trigPattern);

  const userFunc = userTrig ? userTrig[1] : null;
  const correctFunc = correctTrig ? correctTrig[1] : null;

  const userInner = userTrig ? userTrig[2] : null;
  const correctInner = correctTrig ? correctTrig[2] : null;

  const trigError = userFunc !== correctFunc;
  const innerArgumentError = userInner !== correctInner;

  const userOuter = user.replace(trigPattern, "");
  const correctOuter = correct.replace(trigPattern, "");

  const outerEvidence = analyzePolynomialEvidence(userOuter, correctOuter);

  return {
    trigError,
    innerArgumentError,
    outerEvidence,
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
  const evidence = analyzeTrigEvidence(userAnswer, correctAnswer);

  if (evidence.trigError) {
    return {
      isCorrect: false,
      errorType: "TRIG_FUNCTION_ERROR",
      feedback: "The trigonometric derivative function is incorrect.",
    };
  }

  if (evidence.innerArgumentError) {
    return {
      isCorrect: false,
      errorType: "INNER_ARGUMENT_ERROR",
      feedback: "The inner argument is incorrect.",
    };
  }

  return classifyPolynomialError(evidence.outerEvidence);
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
