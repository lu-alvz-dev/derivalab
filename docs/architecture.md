# Architecture Decision

## Overview

DerivaLab follows a client-server architecture:

- Client: React SPA
- Server: REST API (Node.js + Express)
- Communication: HTTP (JSON)

## Rationale

This architecture was chosen because:

- Simple and scalable for MVP
- Widely used in industry
- Easy to deploy independently

## Future Improvements

- Microservices architecture
- GraphQL API

## Exercise Generation System

The system will generate calculus exercises dynamically.

### Initial Scope

- Generate basic derivative exercises
- Functions will include:
  - Polynomial (e.g., x^2 + 3x)
  - Power functions (x^n)

### Approach

- Backend generates the function
- Backend calculates the derivative
- Frontend displays exercise
- User will solve (later phase)

### Example

Input:
f(x) = x^2 + 3x

Output:
f'(x) = 2x + 3

## Answer Validation System

### Flow

1. Backend generates exercise (question + correct answer)
2. Frontend displays exercise
3. User inputs answer
4. Frontend sends answer to backend
5. Backend compares with correct answer
6. Backend returns result (correct / incorrect)
7. Frontend displays feedback

### Endpoint

POST /api/validate

### Example Request

{
"userAnswer": "4x + 5",
"correctAnswer": "4x + 5"
}

### Example Response

{
"isCorrect": true
}

---

## Pending Improvements

- [ ] Add try/catch to all API requests (frontend)
- [ ] Replace alert() with proper UI feedback
- [ ] Handle server errors and network failures

### Completed

_(Empty by now)_

## Advanced Exercise System

### Supported Types

- Polynomial
- Power functions
- Trigonometric (basic)

### Difficulty Levels

- Easy
- Medium
- Hard

### Strategy

The backend will:

1. Receive query params:
   - type
   - difficulty

2. Route to specific generator

3. Return:
   - question
   - answer
   - metadata (type, difficulty)

### Example

GET /api/exercises?type=polynomial&difficulty=easy

Response:

{
"question": "f(x) = 2x^2 + 3x",
"answer": "4x + 3",
"type": "polynomial",
"difficulty": "easy"
}
