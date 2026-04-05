function generatePolynomial() {
  // Generar coeficientes simples
  const a = Math.floor(Math.random() * 5) + 1; // 1–5
  const b = Math.floor(Math.random() * 10); // 0–9

  return { a, b };
}

function getExercise() {
  const { a, b } = generatePolynomial();

  const question = `f(x) = ${a}x^2 + ${b}x`;
  const answer = `f'(x) = ${2 * a}x + ${b}`;

  return {
    question,
    answer,
  };
}

module.exports = {
  getExercise,
};
