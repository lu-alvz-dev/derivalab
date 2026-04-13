function normalizeExpression(expr) {
  if (!expr) return "";

  return expr
    .replace(/\s+/g, "")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/–/g, "-");
}

module.exports = {
  normalizeExpression,
};
