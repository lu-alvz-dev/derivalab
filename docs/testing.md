# Testing – DerivaLab (Day 1)

## Overview

This document describes the initial manual testing performed during Day 1 of development.

The goal is to validate the basic functionality of the system, including:

- Backend server availability
- API endpoint response
- Frontend-backend integration

---

## Backend Testing

### Endpoint: GET /api/health

**Method:**

- Browser

```
http://localhost:3000/api/health
```

**Expected Response:**

```
{
  "status": "ok",
  "message": "Server is running"
}
```

**Result:**
Success — endpoint responds correctly

---

## Frontend Testing

### Application Load

**URL:**

```
http://localhost:5173
```

**Expected Behavior:**

- Page renders without errors
- Displays application title
- Displays message from backend

**Expected Output:**

```
DerivaLab
Server message: Server is running
```

**Result:**
Success — frontend renders and fetches data correctly

---

## Testing-Integration

### Flow

Frontend → Axios → Backend → JSON Response → UI Render

**Validated:**

- API communication works
- Data is correctly received and displayed

**Result:**
Success — full integration working

![Frontend Running](./images/frontend-v1.png)

---

## Conclusion

The system is functional at a basic level, the backend API is operational, the frontend is correctly connected anddata flow between client and server is validated establishing a solid foundation for further feature development.
