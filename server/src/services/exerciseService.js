function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Polynomial

function generatePolynomial(difficulty) {
  let a, b, power;

  if (difficulty === "easy") {
    a = randomInt(1, 3);
    b = randomInt(0, 5);
    power = randomInt(2, 3);
  } else if (difficulty === "medium") {
    a = randomInt(2, 6);
    b = randomInt(1, 10);
    power = randomInt(3, 5);
  } else {
    a = randomInt(5, 10);
    b = randomInt(5, 15);
    power = randomInt(5, 8);
  }

  const question = `f(x) = ${a}x^${power} + ${b}x`;
  const answer = `${a * power}x^${power - 1} + ${b}`;

  return { question, answer };
}

// Power function

function generatePower(difficulty) {
  let n;

  if (difficulty === "easy") {
    n = randomInt(2, 3);
  } else if (difficulty === "medium") {
    n = randomInt(3, 5);
  } else {
    n = randomInt(5, 8);
  }

  const question = `f(x) = x^${n}`;
  const answer = `${n}x^${n - 1}`;

  return { question, answer };
}

// Trigonometric

function generateTrig(difficulty) {
  const functions = ["sin", "cos"];
  const fn = functions[randomInt(0, 1)];

  let question, answer;

  if (difficulty === "easy") {
    // sin(x), cos(x)
    if (fn === "sin") {
      question = `f(x) = sin(x)`;
      answer = `cos(x)`;
    } else {
      question = `f(x) = cos(x)`;
      answer = `-sin(x)`;
    }
  } else if (difficulty === "medium") {
    // sin(ax), cos(ax)
    const a = randomInt(2, 5);

    if (fn === "sin") {
      question = `f(x) = sin(${a}x)`;
      answer = `${a}cos(${a}x)`;
    } else {
      question = `f(x) = cos(${a}x)`;
      answer = `-${a}sin(${a}x)`;
    }
  } else {
    // HARD - rule sin(x^n)
    const n = randomInt(2, 4);

    if (fn === "sin") {
      question = `f(x) = sin(x^${n})`;
      answer = `${n}x^${n - 1}cos(x^${n})`;
    } else {
      question = `f(x) = cos(x^${n})`;
      answer = `-${n}x^${n - 1}sin(x^${n})`;
    }
  }

  return { question, answer };
}

// Main entry

function getExercise(type = "polynomial", difficulty = "easy") {
  let result;

  switch (type) {
    case "power":
      result = generatePower(difficulty);
      break;
    case "trig":
      result = generateTrig(difficulty);
      break;
    case "polynomial":
    default:
      result = generatePolynomial(difficulty);
  }

  // Returns the exercise result with type and difficulty properties added.
  return {
    ...result,
    type,
    difficulty,
  };
}

module.exports = {
  getExercise,
};
