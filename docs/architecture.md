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
