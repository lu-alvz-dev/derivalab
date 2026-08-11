![DerivaLab Preview](docs/images/frontend-v9.png)

# DerivaLab

DerivaLab is a **Full-Stack Micro-SaaS** for high school calculus practice. It helps teachers generate derivative exercises, validate student answers, provide automated feedback, and monitor learning progress through dashboards.

The application is built with React, Node.js, Express, PostgreSQL, JWT authentication, and a separated cloud deployment architecture.

## Problem

Calculus teachers spend time creating exercises, reviewing answers, identifying common errors, and monitoring student progress.

## Solution

DerivaLab automates these repetitive tasks through:

- Derivative exercise generation
- Mathematical answer validation
- Automated feedback
- Error classification
- Student practice history
- Teacher and student dashboards
- Learning analytics and charts
- Demo experiences for evaluation

## Features

### Teacher

- JWT authentication
- Teacher dashboard
- Student management
- Individual student analytics
- Accuracy chart
- Error analysis
- Difficulty distribution
- Student practice history

### Student

- Secure authentication
- Derivative practice
- Mathematical answer validation
- Intelligent feedback
- Personal dashboard
- Practice history
- Accuracy statistics

### Demo

The application includes teacher and student demo experiences so visitors can explore the main workflows without creating an account.

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
- PostgreSQL
- JWT
- bcryptjs
- Helmet
- mathjs

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

## Architecture

```text
React / Vercel
      │
      │ HTTPS / REST API
      ▼
Node.js + Express / Render
      │
      │ PostgreSQL
      ▼
Neon PostgreSQL
```

The frontend communicates with the backend through the REST API. The backend is responsible for authentication, business logic, validation, analytics, and database access.

## Project Structure

```text
DerivaLab
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   ├── database/
│   ├── .env.example
│   └── package.json
├── docs/
└── README.md
```

## Quick Start

### 1. Clone

```bash
git clone https://github.com/lu-alvz-dev/derivalab.git
cd derivalab
```

### 2. Install dependencies

Backend:

```bash
cd server
npm install
```

Frontend:

```bash
cd ../client
npm install
```

### 3. Configure environment variables

Backend:

```text
server/.env
```

Frontend:

```text
client/.env.development
```

Use the corresponding `.env.example` files as templates.

### 4. Configure PostgreSQL

For local development, run:

```text
server/database/schema.sql
```

Optional demo data:

```text
server/database/demo_users.sql
server/database/demo_history.sql
```

### 5. Run locally

Backend:

```bash
cd server
npm start
```

Frontend:

```bash
cd client
npm run dev
```

Local URLs:

```text
Backend:  http://localhost:3000
Frontend: http://localhost:5173
```

## Production

The application is currently deployed using:

```text
Vercel
   ↓
Render
   ↓
Neon PostgreSQL
```

The production frontend uses `VITE_API_URL` to communicate with the Render backend.

Backend health check:

```text
https://derivalab-api.onrender.com/api/health
```

Production frontend:

```text
https://derivalab.vercel.app/
```

## Demo Experience

### Teacher Demo

```text
demo.teacher@derivalab.com
```

The teacher demo provides access to dashboard analytics, students, charts, error analysis, difficulty distribution, and history.

### Student Demo

The student demo can be launched from the application demo experience and provides access to practice, feedback, statistics, and history.

## Environment Variables

The application keeps environment-specific configuration outside the source code.

Frontend:

```text
VITE_API_URL
```

Backend configuration includes:

```text
DATABASE_URL
JWT_SECRET
PORT
CLIENT_URL
```

Secrets are not stored in the repository.

## Documentation

More detailed technical decisions are documented in `docs/`:

| Document          | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `architecture.md` | Overall architecture and deployment design            |
| `backend.md`      | Backend layers, database, authentication and security |
| `frontend.md`     | React structure, routing, API layer and dashboards    |
| `testing.md`      | Manual testing and production validation              |

## Deployment Notes

The frontend and backend are deployed independently.

This makes troubleshooting easier because each layer can be checked separately:

```text
Frontend → Backend → Database
```

For example, the backend health endpoint can be checked independently before investigating frontend API communication.

## Roadmap

Possible future improvements include:

- Additional calculus topics
- More exercise generators
- Automated API tests
- Unit and component tests
- End-to-end testing
- Exportable learning reports

## License

This project is licensed under the **MIT License**.

## Author

**Luis Alvarez**
