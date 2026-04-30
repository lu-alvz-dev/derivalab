![App Preview](docs/images/frontend-v8.png)

# DerivaLab

DerivaLab is a **Full-Stack Micro-SaaS** created to help high school calculus teachers generate exercises, evaluate student answers, and provide automated feedback.

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

---

## Tech Stack

### Frontend

- React

### Backend

- Node.js
- Express

### Database

- PostgreSQL

### Authentication

- JWT
- bcryptjs

---

## Project Status

This project is currently in **MVP development phase**.

---

## Database Setup

The PostgreSQL schema file is located at:

```bash
server/database/schema.sql
```

Run this SQL script in PostgreSQL before starting the backend server.

---

## Environment Variables

Create a `.env` file inside:

```bash
server/.env
```

Add the following variables:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=derivalab
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret_key
```

---

## Run Backend

From the `server` folder:

```bash
npm install
npm run dev
```

The backend will run on:

```bash
http://localhost:3000
```

---

## Run Frontend

From the `client` folder:

```bash
npm install
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

---

## Testing

Manual and integration testing are documented in:

```bash
docs/testing.md
```

This includes:

- Backend validation testing
- Frontend integration checks

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Luis Alvarez**
