# Backend

## Overview

The backend of DerivaLab is built with **Node.js**, **Express**, and **PostgreSQL**.

It provides a REST API for authentication, derivative practice, mathematical validation, feedback, learning analytics, and dashboard data.

The structure intentionally stays simple while separating responsibilities between routes, controllers, services, and database access.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg connection pool
- JWT
- bcryptjs
- Helmet
- CORS
- dotenv
- mathjs

## Project Structure

```text
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── database/
│   ├── schema.sql
│   ├── demo_users.sql
│   └── demo_history.sql
├── .env.example
└── package.json
```

## Layered Architecture

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
PostgreSQL
```

### Routes

Routes define API endpoints and group functionality by feature.

### Controllers

Controllers handle HTTP requests, validate required input, call services, and return responses.

### Services

Services contain business logic and database operations.

This separation keeps controllers smaller and makes the code easier to follow.

## REST API

Main API areas include:

```text
/api/auth
/api/exercises
/api/validate
/api/feedback
/api/stats
/api/history
/api/dashboard
/api/student-dashboard
```

## Database

DerivaLab uses PostgreSQL as its relational database.

Database access uses a shared connection pool from the `pg` package.

The connection supports both local PostgreSQL and Neon PostgreSQL.

Production uses:

```text
DATABASE_URL
```

Local development can use individual database variables.

## Connection Pool

The backend creates a PostgreSQL connection pool instead of opening a new database connection for every request.

This provides a simple and efficient way to reuse database connections across API requests.

## Authentication

Authentication uses JSON Web Tokens.

Login flow:

```text
Client
  ↓
POST /api/auth/login
  ↓
Credential validation
  ↓
bcrypt password comparison
  ↓
JWT generation
  ↓
Token returned to client
```

Protected routes require a valid token.

Role-based checks are used to separate teacher and student resources.

## Password Security

Passwords are hashed with **bcryptjs** before storage.

Plain-text passwords are not stored in PostgreSQL.

## Security Middleware

### Helmet

Helmet adds common HTTP security headers.

### CORS

CORS restricts browser requests to configured frontend origins.

The production frontend URL is provided through:

```text
CLIENT_URL
```

### Request Body Limit

JSON request bodies are limited to:

```text
10 KB
```

This is a simple protection against unnecessarily large requests.

## Validation

The backend validates user input such as:

- Email format
- Password requirements
- Required request fields
- Route parameters

Mathematical answers are processed through the validation/feedback flow using mathjs.

## SQL Queries

Database queries use parameterized values rather than string concatenation.

This reduces SQL injection risk and keeps database operations explicit.

## Environment Variables

Configuration is kept outside the source code.

Important backend variables include:

```text
DATABASE_URL
JWT_SECRET
PORT
CLIENT_URL
```

The same application code can therefore run with different local and production configurations.

## Error Handling

Controllers return appropriate HTTP responses for expected validation and authentication failures.

Unexpected errors are handled without intentionally exposing sensitive implementation details to clients.

## Production Deployment

The backend is deployed on **Render**.

Current architecture:

```text
Vercel Frontend
      ↓
Render REST API
      ↓
Neon PostgreSQL
```

The backend listens on the port provided by Render through:

```text
process.env.PORT
```

The API health endpoint is:

```text
https://derivalab-api.onrender.com/api/health
```

## Design Goals

The backend demonstrates:

- REST API design
- Layered architecture
- PostgreSQL integration
- Connection pooling
- JWT authentication
- Secure password storage
- Input validation
- Basic security hardening
- Environment-based configuration
- Independent cloud deployment

The architecture is intentionally straightforward and focused on readability.
