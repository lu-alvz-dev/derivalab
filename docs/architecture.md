# Architecture

## Overview

DerivaLab follows a layered client-server architecture designed to separate responsibilities, improve maintainability, and support independent deployment.

The system is organized into three main layers:

- React Frontend
- Node.js + Express REST API
- PostgreSQL Database

Each layer has a specific responsibility and communicates through defined interfaces.

## High-Level Architecture

```text
┌──────────────────────────┐
│     React Frontend       │
│          Vercel          │
└────────────┬─────────────┘
             │
             │ HTTPS / JSON
             ▼
┌──────────────────────────┐
│    Node.js + Express     │
│          Render          │
└────────────┬─────────────┘
             │
             │ PostgreSQL
             ▼
┌──────────────────────────┐
│    Neon PostgreSQL       │
└──────────────────────────┘
```

The frontend never communicates directly with PostgreSQL.

## Frontend

The frontend is a React Single Page Application built with Vite.

Responsibilities include:

- Rendering the interface
- Managing navigation
- Communicating with the REST API
- Displaying exercises
- Collecting answers
- Displaying dashboards and charts
- Providing demo experiences

## Backend

The backend uses Node.js and Express.

It is responsible for:

- Authentication
- Authorization
- Exercise generation
- Mathematical validation
- Feedback generation
- Statistics
- Teacher dashboards
- Student dashboards
- Practice history

Business logic is separated from HTTP request handling through routes, controllers, and services.

## Database

PostgreSQL stores persistent application data.

Current data includes:

- Users
- Teacher/student relationships
- Practice attempts
- Correct answers
- User answers
- Exercise type
- Difficulty
- Error classification
- Statistics
- Timestamps

## Backend Layers

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

Examples:

```text
/api/auth
/api/exercises
/api/feedback
/api/history
/api/dashboard
/api/student-dashboard
```

### Controllers

Controllers receive requests, validate required input, call services, and return HTTP responses.

### Services

Services contain business logic such as authentication, mathematical validation, feedback, statistics, and dashboard calculations.

## Authentication

Authentication uses JWT.

```text
Login
  ↓
POST /api/auth/login
  ↓
Credential validation
  ↓
bcrypt password verification
  ↓
JWT generation
  ↓
Token returned to frontend
  ↓
Protected API requests
```

Role-based authorization separates teacher and student functionality.

## Answer Validation

Answers are validated mathematically rather than through simple string comparison.

```text
Student Answer
      ↓
Normalization
      ↓
mathjs comparison
      ↓
Correct?
   ↙       ↘
 Yes       No
 ↓          ↓
Success   Error classification
              ↓
        Feedback generation
```

## Dashboard Architecture

Teacher dashboards aggregate student learning data.

Current metrics include:

- Total students
- Attempts
- Correct answers
- Accuracy
- Error distribution
- Difficulty distribution
- Practice history

Student dashboards focus on:

- Accuracy
- Practice history
- Statistics
- Learning progress

## Security

Current security measures include:

- JWT authentication
- bcrypt password hashing
- Helmet security headers
- CORS configuration
- Email validation
- Password validation
- JSON body limit
- Parameterized SQL queries
- Environment variables for sensitive configuration

## Environment Configuration

Configuration changes by environment.

```text
Development
     ↓
VITE_API_URL → Local backend

Production
     ↓
VITE_API_URL → Render backend
```

Backend production configuration uses environment variables such as:

```text
DATABASE_URL
JWT_SECRET
PORT
CLIENT_URL
```

## Deployment Architecture

The current production deployment is:

```text
Vercel
  ↓
Render
  ↓
Neon PostgreSQL
```

The frontend and backend are deployed independently.

This makes it possible to verify each layer separately when troubleshooting production issues.

## Current Status

DerivaLab currently includes:

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
- Production environment configuration
- Vercel frontend deployment
- Render backend deployment
- Neon PostgreSQL database
