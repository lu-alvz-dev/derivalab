# Frontend Architecture – DerivaLab

## Overview

The frontend of DerivaLab is built with **React** and **Vite**.

I break the app down into separate parts. The user interface uses React components, while the routing and API connections live in their own modules. My main goal is to keep the code organized, easy to read, and simple to maintain as the project grows.

---

## Purpose

The frontend is responsible for:

- Rendering the user interface
- Managing application navigation
- Communicating with the backend API
- Displaying learning analytics
- Providing responsive feedback during user interactions

---

## Tech Stack

- React
- React Router
- Vite
- Axios
- Recharts
- Tailwind CSS

---

## Project Structure

```text
client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── vite.config.js
```

---

## Architecture Decisions

### Component-Based Design

The interface is divided into reusable components.

Each component has a single responsibility, making the application easier to understand and maintain.

Examples include:

- Charts
- Dashboard cards
- Tables
- Forms
- Navigation

---

### Routing

Navigation is managed using **React Router**.

Different routes are used for:

- Authentication
- Student Dashboard
- Teacher Dashboard
- Demo experience

This separates navigation from our core app features or what we call business logic.

---

### API Layer

All HTTP requests are centralized inside the `services/` directory.

Axios is used to communicate with the backend.

This approach provides:

- Centralized API configuration
- Easier maintenance
- Reusable request functions
- Simpler migration between environments

---

### Environment Variables

The frontend does not contain hardcoded backend URLs.

Instead, it uses:

```text
VITE_API_URL
```

This allows the same codebase to work in both local development and internet-production environments.

---

### Dashboard Architecture

Learning analytics are displayed using reusable chart components.

The frontend receives processed data from the backend and focuses only on presentation.

Charts currently include:

- Learning Accuracy
- Error Distribution
- Exercise Difficulty

Recharts is used to visualize the information with responsive components.

---

## Development Principles

The frontend follows a few simple principles:

- Reusable components
- Clear folder organization
- Separation of responsabilities
- Writing small files that focus on one task
- Try to be consistent with naming conventions

---

## Design Goals

The frontend shows:

- Modern React application structure
- Component reuse
- REST API integration
- Client-side routing
- Environment variable configuration
- Dashboard implementation
- Maintainable project organization
