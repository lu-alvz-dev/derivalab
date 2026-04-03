# Architecture Decision

## Overview

DerivaLab follows a client-server architecture:

- Client: React SPA
- Server: REST API (Node.js + Express)
- Communication: HTTP (JSON)

## Rationale

This architecture was chosen because:

- Simple and scalable for MVP
- Widely used in industry
- Easy to deploy independently

## Future Improvements

- Microservices architecture
- GraphQL API
