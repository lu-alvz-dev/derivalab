# Frontend

## Overview

The frontend of DerivaLab is a React Single Page Application built with Vite.

The application is organized into reusable components, page-level views, API services, and routing.

The goal is to keep the code understandable and maintainable while the application grows.

## Tech Stack

- React
- React Router
- Vite
- Axios
- Recharts
- Tailwind CSS

## Project Structure

```text
client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

## Component-Based Design

The interface is divided into reusable components.

Examples include:

- Dashboard cards
- Charts
- Tables
- Forms
- Navigation
- Feedback panels

The goal is to keep components focused on presentation and interaction instead of putting unrelated logic into a single large component.

## Routing

Navigation is handled with **React Router**.

Routes cover:

- Authentication
- Student workflow
- Teacher dashboard
- Demo experiences

Because DerivaLab is a SPA, production hosting must also support client-side route fallback.

The Vercel deployment was configured to handle refreshes on application routes correctly.

## API Layer

HTTP requests are centralized in:

```text
client/src/services/api.js
```

Axios is used as the HTTP client.

The API module also adds the JWT token to authenticated requests through an Axios request interceptor.

This keeps authentication-related request behavior in one place.

## Environment Variables

The frontend does not hardcode the backend production URL inside the application logic.

It uses:

```text
VITE_API_URL
```

Development example:

```text
VITE_API_URL=http://localhost:3000/api
```

Production example:

```text
VITE_API_URL=https://derivalab-api.onrender.com/api
```

This allows the same frontend codebase to communicate with different backend environments.

## Dashboard

Dashboards are built from reusable UI sections and chart components.

Teacher analytics currently include:

- Learning accuracy
- Error distribution
- Exercise difficulty
- Student statistics
- Practice history

Student analytics include:

- Accuracy
- Practice history
- Learning statistics
- Progress information

The frontend receives processed analytics data from the backend and focuses primarily on presentation.

## Recharts

Recharts is used for the dashboard visualizations.

Charts use responsive containers so they can adapt to different screen sizes.

The dashboard was also adjusted for:

- Desktop
- Tablet
- Mobile

Responsive layout decisions were made with Tailwind CSS grid and ordering utilities.

## Responsive Design

The Teacher Dashboard uses responsive grids and content ordering.

On large screens:

```text
Sidebar | Main Content
```

On smaller screens:

```text
Main Content
     ↓
Sidebar
```

This prioritizes the most important analytics before secondary navigation on mobile devices.

## Tailwind CSS

Tailwind CSS is used for layout, spacing, typography, responsive behavior, borders, shadows, and interactive states.

The project uses utility classes instead of introducing a large custom CSS layer for every component.

## Demo Experience

The frontend includes demo flows for teacher and student users.

The demo experience allows visitors to explore the application without going through the complete registration workflow.

## Deployment

The production frontend is deployed on **Vercel**.

Current architecture:

```text
React / Vercel
      ↓
Render API
      ↓
Neon PostgreSQL
```

Production API configuration uses:

```text
VITE_API_URL=https://derivalab-api.onrender.com/api
```

## Development Principles

The frontend follows a few practical principles:

- Reusable components
- Clear folder organization
- Separation of responsibilities
- Centralized API communication
- Environment-based configuration
- Responsive layouts
- Small, focused modules
- Consistent naming

## Design Goals

The frontend demonstrates:

- Modern React structure
- Component reuse
- Client-side routing
- REST API integration
- Environment configuration
- Dashboard development
- Responsive UI
- Maintainable project organization
