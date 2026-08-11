# Testing – DerivaLab

## Overview

This document summarizes the manual testing performed during the development and deployment of DerivaLab.

The goal is to verify the main application workflows from the backend, frontend, integration, authentication, dashboard, security, and production perspectives.

## Testing Strategy

Testing was performed from three main perspectives:

- Backend endpoint validation
- Frontend integration
- Complete user workflows

When possible, features were verified through the complete application flow instead of only checking isolated components.

## Health Check

### Local

```text
GET /api/health
```

Verified:

- Server starts correctly
- API responds successfully
- JSON response is returned

Result:

**Passed**

### Production

```text
https://derivalab-api.onrender.com/api/health
```

Verified:

- Render service is running
- Production API responds
- JSON response is returned

Result:

**Passed**

## Authentication

### Registration

Verified:

- Teacher registration
- Student registration
- Email validation
- Minimum password requirements
- Password hashing

Result:

**Passed**

### Login

Verified:

- Valid credentials
- Invalid credentials
- JWT generation
- Protected route access

Result:

**Passed**

## Exercise Generation

Verified:

- Polynomial exercises
- Power rule exercises
- Trigonometric exercises
- Difficulty selection
- Random exercise generation
- Production API response

Result:

**Passed**

## Mathematical Validation

Verified:

- Equivalent expressions
- Different exponent notation
- Incorrect answers
- Mathematical normalization

Example:

```text
4x + 5
5 + 4x
```

Both expressions can represent the same mathematical result.

Result:

**Passed**

## Feedback Engine

Verified:

- Correct answers
- Incorrect answers
- Error classification
- Contextual feedback generation

The validation and feedback flow was tested through the application rather than relying only on isolated API responses.

Result:

**Passed**

## Student Dashboard

Verified:

- Statistics
- Practice history
- Accuracy
- Learning progress
- Dashboard refresh after new attempts

Result:

**Passed**

## Teacher Dashboard

Verified:

- Student list
- Overall statistics
- Accuracy chart
- Error distribution
- Difficulty distribution
- Individual student analytics
- Practice history

Special attention was given to accuracy calculations after multiple practice attempts.

Result:

**Passed**

## Analytics Bug Validation

During development, a discrepancy was found between dashboard accuracy and the last point of the accuracy chart.

The investigation showed that the chart was calculating cumulative accuracy after the backend had already limited the history to the last 40 attempts.

The fix changed the processing order:

```text
Calculate complete history
          ↓
Trim returned chart points
```

instead of:

```text
Trim history
     ↓
Calculate accuracy
```

After the change, dashboard and chart accuracy matched.

Result:

**Passed**

## Demo Experience

Verified:

- Teacher demo access
- Student demo access
- Demo dashboards
- Demo analytics
- Practice workflow
- History display

Result:

**Passed**

## API Integration

The complete communication flow was verified:

```text
React
  ↓
Axios
  ↓
Render API
  ↓
PostgreSQL
  ↓
JSON Response
  ↓
React UI
```

Verified:

- Successful requests
- Authentication headers
- API responses
- Dashboard data loading
- Practice workflow
- Production communication

Result:

**Passed**

## Environment Configuration

Verified:

- Local backend environment variables
- Local frontend `VITE_API_URL`
- Production frontend API configuration
- Render environment configuration
- Neon `DATABASE_URL`
- No production secrets committed to the repository

Result:

**Passed**

## Security Validation

### JWT

- Protected routes require authentication.
- Unauthorized requests are rejected.

### Password Protection

- Passwords are stored using bcrypt hashes.

### SQL Injection Protection

- Database queries use parameterized PostgreSQL statements.

### Input Validation

- Email format
- Password requirements
- Required request data

### HTTP Security

- Helmet security headers
- JSON body size limit
- CORS configuration

Result:

**Passed**

## Production Validation

The deployed architecture was tested layer by layer:

```text
Vercel
  ↓
Render
  ↓
Neon
```

Verified:

- Frontend loads successfully
- Frontend can communicate with Render
- Render API responds
- Database-backed functionality works
- Demo workflows operate in production
- Client-side route refresh works after Vercel routing configuration

Result:

**Passed**

## Current Testing Approach

Testing is currently manual and integration-focused.

This is appropriate for the current project stage, but the next logical improvements are:

- Automated API tests
- Unit tests
- React component tests
- End-to-end tests
- CI pipeline integration

## Conclusion

Manual testing has validated the main DerivaLab workflows across local development and the current production deployment.

The current validation covers:

- Authentication
- Exercise generation
- Mathematical validation
- Feedback generation
- Teacher dashboard
- Student dashboard
- Demo experience
- REST API integration
- Environment configuration
- Basic security
- Production deployment
