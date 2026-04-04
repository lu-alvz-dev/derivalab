# Frontend Architecture – DerivaLab

## Overview

The frontend of DerivaLab is built using React with Vite as the build tool.  
It follows a modular and scalable structure designed for maintainability and clarity.

---

## Why Vite?

I decided to use Vite because requires zero configuration and fast updates, so I can focus on writing code, also aligns with modern frontend development standards.

---

## Tech Stack

- React (Frontend library)
- Vite (build tool)
- Axios (HTTP client)
- Tailwind (utility-first framework)

---

## Project Structure

```
client/
├── public/        # Static assets (favicon, future branding)
├── src/
│   ├── assets/    # Images and static resources (bundled)
│   ├── components/# Reusable UI components
│   ├── pages/     # Page-level components (views)
│   ├── services/  # API communication layer
│   ├── hooks/     # Custom React hooks
│   ├── App.jsx    # Root component
│   └── main.jsx   # Entry point
```

---

## Architectural Decisions

### 1. Separation of Concerns

- Components handle UI
- Services handle API calls

---

### 2. Component-Based Design

The UI is broken down into reusable components to:

- Avoid duplication
- Improve maintainability
- Faster development

---

### 3. API Layer Abstraction

All HTTP requests are handled through a dedicated `services/` layer.

Benefits:

- Centralized API logic
- Easier error handling
- Easier backend replacement or scaling

---

## Future Improvements

- Add global state management (Context API)
- Implement form handling (React Hook Form)
- Add UI system (Tailwind)
- Add testing (React Testing)

---

## Development Principles

- Clean and readable code
- Consistent naming conventions
- Small, focused components

---

## Goal

The frontend is designed to be functional and to demonstrate:

- Real-world project structure
- Professional decision-making
- Readability and maintainability
