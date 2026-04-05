# Testing – DerivaLab

## Day 1

This document describes the manual testing performed during may journey creating Derivalab.

## Overview

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

---

## Day 2 – Exercise Generation Testing

### 1. Backend Endpoint Test

**Endpoint:**
GET /api/exercises

**Method:**
Browser and curl

**Steps:**

1. Start server:

   ```
   cd server
   npm run dev
   ```

2. Open:

   ```
   http://localhost:3000/api/exercises
   ```

3. Alternative (terminal):
   ```
   curl http://localhost:3000/api/exercises
   ```

**Expected Response:**

- JSON object
- Contains:
  - question
  - answer

Example:

```
{
  "question": "f(x) = 3x^2 + 4x",
  "answer": "f'(x) = 6x + 4"
}
```

**Evidence:**
![Backend Test](./images/backend-exercise.png)

**Result:**
Endpoint returns valid and random derivative exercises

---

### 2. Frontend Integration Test

**URL:**
http://localhost:5173

**Steps:**

1. Start frontend:

   ```
   cd client
   npm run dev
   ```

2. Open application in browser

3. Verify:
   - Exercise is displayed
   - Answer is displayed
   - Button generates new exercise

**Expected Behavior:**

- UI renders without errors
- Clicking "Generate New" updates exercise

**Evidence:**
![Frontend Test](./images/frontend-v2.png)

**Result:**
Frontend successfully fetches and displays exercises from backend

---

### 3. Integration Flow Test

**Flow:**

Frontend → Axios → Backend → Service → Response → UI

**Validated:**

- API communication works
- Data is correctly transferred
- UI updates dynamically

**Result:**
Full-stack integration working correctly
