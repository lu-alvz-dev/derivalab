# Backend Architecture – DerivaLab

## Overview

The backend of DerivaLab is built with **Node.js**, **Express**, and **PostgreSQL**.

Uses a REST API that manages authentication, derivative practice, learning analytics, and dashboard data for both teachers and students.

The project shows a simple layered architecture focused on readability, maintainability, and separation of responsibilities.

---

## Purpose

The backend is responsible for:

- Handling HTTP requests
- Managing business logic
- Authenticating users
- Accessing the PostgreSQL database
- Validating incoming data
- Returning structured JSON responses

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg (Connection Pool)
- JWT Authentication
- bcryptjs
- Helmet
- CORS
- dotenv

---

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
│
├── database/
│   ├── schema.sql
│   ├── demo_users.sql
│   └── demo_history.sql
│
├── .env.example
└── package.json
```

---

## Architecture Decisions

### Layered Architecture

The backend separates responsibilities into independent layers.

- **Routes** define API endpoints.
- **Controllers** receive requests and return responses.
- **Services** contain business logic and database queries.

This organization makes the project easier to understand and maintain.

---

### REST API

DerivaLab uses a REST architecture.

Endpoints are grouped by feature:

- Authentication
- Practice
- Feedback
- Student Dashboard
- Teacher Dashboard

This structure keeps related functionality together and simplifies future development.

---

## Database

DerivaLab uses **PostgreSQL** as its relational database.

Database access is managed through a shared **connection pool** using the `pg` library.

The application supports:

- Local PostgreSQL
- Neon PostgreSQL using `DATABASE_URL`

The database schema is managed with SQL scripts.

---

## Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

Passwords are never stored as plain text.

Instead:

- Passwords are hashed with **bcryptjs**
- JWT tokens are generated after successful login
- Protected routes validate the token before processing requests

---

## Security

Several basic security practices are implemented.

### Helmet

Security headers are added using Helmet.

### CORS

CORS is configured to allow communication between the frontend and backend.

### Request Body Limit

Incoming JSON requests are limited to **10 KB** to reduce the impact of oversized requests.

### Input Validation

The backend validates:

- Email format
- Minimum password length

SQL injection risks are reduced by using **parameterized PostgreSQL queries** throughout the application.

---

## Environment Variables

Sensitive configuration is stored outside the source code.

Examples include:

- DATABASE_URL
- JWT_SECRET
- PORT
- Frontend URL (for CORS)

This allows different configurations for local development on our machines versus online

---

## Error Handling

Controllers validate incoming requests and return consistent HTTP responses.

Unexpected server errors are handled without exposing sensitive implementation details to the client.

---

## Design Goals

The backend demonstrates:

- Clean project organization
- Basic REST API design
- Authentication with JWT
- Secure password storage
- Database integration
- Separation of concerns
- Production-ready configuration using environment variables
