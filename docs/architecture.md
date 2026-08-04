# Architecture

## Overview

DerivaLab follows a layered client-server architecture designed to separate responsibilities, improve maintainability, and prepare the application for production deployment.

The project is organized into three independent layers:

- React Frontend
- REST API Backend
- PostgreSQL Database

Each layer has a single responsibility and communicates through well-defined interfaces.

---

# High-Level Architecture

```text
┌───────────────────────┐
│       React           │
│   (Frontend - Vite)   │
└───────────┬───────────┘
            │
      HTTP / JSON
            │
            ▼
┌───────────────────────┐
│   Express REST API    │
│  (Node.js Backend)    │
└───────────┬───────────┘
            │
      SQL Queries
            │
            ▼
┌───────────────────────┐
│     PostgreSQL        │
│       Database        │
└───────────────────────┘
```

---

# Architecture Layers

## Frontend

The frontend is a React Single Page Application (SPA) built with Vite.

Its responsibilities include:

- Rendering the user interface
- Managing navigation
- Communicating with the backend API
- Displaying dashboards and charts
- Showing mathematical exercises
- Collecting user answers

The frontend never communicates directly with the database.

---

## Backend

The backend is built using Node.js and Express.

It exposes a REST API responsible for:

- Authentication
- Authorization
- Exercise generation
- Mathematical validation
- Intelligent feedback
- Statistics generation
- Teacher dashboards
- Student dashboards
- History management

Business logic is separated from HTTP request handling by using a layered architecture.

---

## Database

PostgreSQL stores all persistent application data.

Current entities include:

- Users
- Exercise History

The database stores:

- Practice attempts
- Correct answers
- User answers
- Error types
- Statistics
- Teacher/student relationships

---

# Layered Backend Architecture

The backend follows a layered architecture.

```text
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Database
```

Each layer has a specific responsibility.

## Routes

Routes define the available API endpoints.

Example:

- /api/auth
- /api/dashboard
- /api/history
- /api/feedback

Routes do not contain business logic.

---

## Controllers

Controllers receive HTTP requests.

Responsibilities:

- Validate incoming data
- Call services
- Return HTTP responses

Controllers remain intentionally small.

---

## Services

Services contain the application's business logic.

Examples:

- Authentication
- Dashboard calculations
- Mathematical validation
- Feedback generation
- Statistics processing

This separation makes the project easier to maintain and extend.

---

# Authentication Architecture

Authentication uses JSON Web Tokens (JWT).

Login flow:

```text
User
   │
   ▼
Login Page
   │
   ▼
POST /api/auth/login
   │
   ▼
Authentication Service
   │
   ▼
bcrypt Password Verification
   │
   ▼
JWT Generation
   │
   ▼
Token returned to Frontend
```

Protected routes require a valid JWT before accessing application resources.

Role-based authorization restricts access to Teacher and Student functionality.

---

# Database Architecture

The current schema includes:

Users

- Teachers
- Students

Exercise History

- Question
- Correct Answer
- User Answer
- Exercise Type
- Difficulty
- Correct/Incorrect
- Error Type
- Timestamp

Relationships

```text
Teacher
   │
   │ 1
   │
   ├───────────────┐
                   │
              Student
                   │
                   │ 1
                   │
                   ▼
          Exercise History
```

---

# Exercise Flow

The exercise workflow is fully handled by the backend.

```text
Teacher / Student
        │
        ▼
Request Exercise
        │
        ▼
Exercise Generator
        │
        ▼
Derivative Calculation
        │
        ▼
JSON Response
        │
        ▼
Frontend
```

---

# Answer Validation Flow

User answers are validated mathematically instead of using string comparison.

```text
Student Answer
       │
       ▼
Normalization
       │
       ▼
Mathematical Comparison
       │
       ▼
Correct?
   │         │
 Yes         No
 │            │
 ▼            ▼
Success   Error Analysis
                │
                ▼
      Intelligent Feedback
```

The validation engine supports equivalent mathematical expressions.

---

# Dashboard Architecture

Teacher dashboards aggregate information from multiple students.

Displayed metrics include:

- Total students
- Total attempts
- Correct answers
- Learning accuracy
- Error distribution
- Difficulty distribution

Student dashboards display:

- Practice history
- Accuracy
- Statistics
- Learning progress

---

# Security

Current security measures include:

- JWT authentication
- bcrypt password hashing
- Helmet security headers
- Email validation
- Minimum password length validation
- Request body size limit
- Parameterized SQL queries
- Environment variables for sensitive configuration

These measures provide a secure foundation suitable for an MVP and prepare the application for production deployment.

---

# Environment Configuration

Configuration values are stored outside the source code using environment variables.

Examples include:

- Database connection
- JWT secret
- Server port
- API URLs

This allows different configurations for:

- Local development
- Testing
- Production

---

# Deployment Architecture

The application is prepared for cloud deployment.

Target production architecture:

```text
React (Vercel)
        │
        ▼
Node.js API (Koyeb)
        │
        ▼
Neon PostgreSQL
```

Each service can be deployed independently.

---

# Architectural Decisions

The following design decisions were made during development:

- Layered backend architecture
- REST API communication
- Stateless authentication with JWT
- PostgreSQL relational database
- Separate frontend and backend deployments
- Environment-based configuration
- Reusable React components
- Service-oriented backend organization

These decisions keep the codebase simple while allowing future growth.

---

# Current Status

The current MVP includes:

- Authentication
- Teacher workflow
- Student workflow
- Exercise generation
- Mathematical validation
- Intelligent feedback
- Learning analytics
- Teacher dashboard
- Student dashboard
- Practice history
- Interactive charts
- Demo experience
- Security hardening
- Production-ready environment configuration
- Prepared deployment for Neon, Koyeb and Vercel
