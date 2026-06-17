# Student Result Management System

Student Result Management System (SRMS) built with React, Vite, Tailwind CSS, Node.js, Express, JWT authentication, MySQL, and PDFKit. The project is structured for Amazon RDS-backed MySQL deployments and supports role-based portals for admins, faculty, and students.

## Features

- JWT authentication with `admin`, `faculty`, and `student` roles
- Admin CRUD for students, faculty, courses, and subjects
- Faculty marks entry, marks update, and result review
- Student dashboard, profile view, result view, and PDF marksheet download
- Analytics dashboard with Recharts visualizations
- Amazon RDS-compatible MySQL configuration using environment variables
- Docker, Nginx, and deployment-oriented project structure

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    scripts/
    utils/
  server.js
  .env.example
frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    routes/
    services/
    utils/
database/
  schema.sql
nginx/
  default.conf
docker-compose.yml
AWS_DEPLOYMENT.md
```

## Backend Setup

1. Create `backend/.env` from [backend/.env.example](/d:/Projects/SRMS/backend/.env.example).
2. Set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` to your Amazon RDS MySQL instance.
3. Run the schema in [database/schema.sql](/d:/Projects/SRMS/database/schema.sql).
4. Install dependencies in `backend`.
5. Start the backend with `npm run dev`.

## Frontend Setup

1. Create `frontend/.env` from [frontend/.env.example](/d:/Projects/SRMS/frontend/.env.example).
2. Set `VITE_API_BASE_URL` to the backend API URL.
3. Install dependencies in `frontend`.
4. Start the frontend with `npm run dev`.

## Seed Data

The backend includes a sample seed script:

```bash
cd backend
npm run seed
```

Sample credentials created by the seed script:

- `admin@srms.edu / Admin@123`
- `faculty@srms.edu / Faculty@123`
- `student@srms.edu / Student@123`

## API Overview

### Authentication

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/profile`

### Students

- `GET /api/students`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`

### Faculty

- `GET /api/faculty`
- `POST /api/faculty`
- `PUT /api/faculty/:id`
- `DELETE /api/faculty/:id`

### Courses

- `GET /api/courses`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`

### Subjects

- `GET /api/subjects`
- `POST /api/subjects`
- `PUT /api/subjects/:id`
- `DELETE /api/subjects/:id`

### Results

- `GET /api/results`
- `POST /api/results`
- `PUT /api/results/:id`
- `DELETE /api/results/:id`
- `GET /api/results/student/:id`
- `GET /api/results/student/:id/marksheet`

## Deployment Assets

- [backend/Dockerfile](/d:/Projects/SRMS/backend/Dockerfile)
- [frontend/Dockerfile](/d:/Projects/SRMS/frontend/Dockerfile)
- [docker-compose.yml](/d:/Projects/SRMS/docker-compose.yml)
- [nginx/default.conf](/d:/Projects/SRMS/nginx/default.conf)
- [AWS_DEPLOYMENT.md](/d:/Projects/SRMS/AWS_DEPLOYMENT.md)
"# Student-Results-Mgmt-Sys" 
