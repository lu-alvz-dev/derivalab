![App Preview](docs/images/frontend-v9.png)

# DerivaLab

DerivaLab is a **Full-Stack Micro-SaaS** created to help high school calculus teachers generate derivative exercises, evaluate student answers, and provide automated feedback, and monitor learning progress through interactive analytics dashboards.

---

## Problem

Teachers often spend too much time on repetitive tasks such as:

- Creating calculus exercises manually
- Reviewing student answers one by one
- Writing personalized feedback for every student

---

## Solution

DerivaLab helps automate these processes by providing:

- Automatic exercise generation
- Answer validation
- Automated feedback generation
- Learning analytics
- Personalized feedback
- Teacher and student dashboards

---

## Features

Current MVP features include:

- Teacher Dashboard
- Student Dashboard
- JWT Authentication
- Derivative Exercise Generator
- Automatic Answer Validation
- Intelligent Feedback
- Learning Analytics
- Student Practice History
- Accuracy Charts
- Error Analysis
- Difficulty Distribution
- Demo Experience
- Responsive Interface

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Recharts
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- JWT
- bcryptjs

### Database

- PostgreSQL

---

## Project Status

This project is currently in **MVP development phase**.

The application already includes complete teacher and student workflows and is currently being prepared for production deployment.

---

# Quick Start

## 1. Clone the repository

```bash
git clone https://github.com/your-username/derivalab.git

cd derivalab
```

---

## 2. Install backend dependencies

```bash
cd server

npm install
```

---

## 3. Install frontend dependencies

```bash
cd ../client

npm install
```

---

## 4. Configure environment variables

Create:

```text
server/.env
```

using the values from:

```text
server/.env.example
```

---

## 5. Create the PostgreSQL database

Run:

```text
server/database/schema.sql
```

Then load the demo data if desired:

```text
server/database/demo_users.sql

server/database/demo_history.sql
```

---

## 6. Start the backend

```bash
cd server

npm run dev
```

Backend:

```text
http://localhost:3000
```

---

## 7. Start the frontend

```bash
cd client

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Project Structure

```text
DerivaLab
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── database/
│   ├── .env.example
│   └── package.json
│
├── docs/
│
└── README.md
```

---

## Demo Experience

DerivaLab includes demo accounts that allow recruiters and reviewers to explore the application without creating an account.

### Teacher Demo

```
demo.teacher@derivalab.com
```

Provides access to:

- Teacher Dashboard
- Student Analytics
- Accuracy Charts
- Error Analysis
- Difficulty Distribution
- Student History

---

### Student Demo

```
demo.student@derivalab.com
```

Provides access to:

- Student Dashboard
- Practice Exercises
- Instant Feedback
- Learning Statistics
- Practice History

The demo login is performed automatically from the application.

---

## Database Setup

The PostgreSQL schema file is located at:

```text
server/database/schema.sql
```

Run this SQL script before starting the backend.

---

## Environment Variables

Create:

```text
server/.env
```

using:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=derivalab
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key

PORT=3000
```

---

## Testing

Manual and integration testing are documented in:

```text
docs/testing.md
```

This includes:

- Backend validation
- Frontend integration
- User workflow verification

---

## Deployment (In Progress)

The application is currently being prepared for cloud deployment.

Planned deployment architecture:

| Service  | Platform        |
| -------- | --------------- |
| Frontend | Vercel          |
| Backend  | Koyeb           |
| Database | Neon PostgreSQL |

Deployment configuration will be added in future iterations.

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Luis Alvarez**
