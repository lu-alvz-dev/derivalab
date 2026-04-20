function normalizeExpression(expr) {
  if (!expr) return "";

  return (
    expr
      .replace(/\s+/g, "")
      .replace(/²/g, "^2")
      .replace(/³/g, "^3")
      .replace(/–/g, "-")

      // Insert * between number and variable: 2x -> 2*x
      .replace(/(\d)(x)/g, "$1*$2")

      // Insert * between variable and trig function: xsin -> x*sin
      .replace(/(x)(sin|cos|tan)/g, "$1*$2")

      // Insert * between number and trig function: 2sin -> 2*sin
      .replace(/(\d)(sin|cos|tan)/g, "$1*$2")
  );
}

module.exports = {
  normalizeExpression,
};
