# AI Sales Doctor - Lead Management MVP

A modern Lead Management System with atomic architecture, built with FastAPI (Python) and React (TypeScript + Tailwind CSS + shadcn/ui).

## 🚀 Tech Stack

### Backend (API)

- **Framework**: FastAPI 0.128.0
- **Package Manager**: uv (ultra-fast Python package installer)
- **Database**: SQLite with SQLAlchemy ORM
- **Validation**: Pydantic v2
- **Async Server**: Uvicorn

### Frontend (Web)

- **Framework**: React 18+ with Vite
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM v6
- **HTTP Client**: Native Fetch API

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- uv (Python package manager)
- Yarn

### Backend Setup

```bash
cd api
uv sync
```

Run the development server:

```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd web
yarn install
```

Run development server:

```bash
yarn dev
```

The web app will be available at `http://localhost:5173`

## 🎯 Features

### Page 1: Leads List (`/`)

- Display all leads in a responsive table
- Filter by industry and headcount range
- Delete leads with confirmation
- Enrich leads (placeholder for 3rd party API integration)
- Real-time data refresh

### Page 2: Add Lead (`/add-lead`)

- Form to create new leads
- Validation for required fields
- Pre-defined industry and job title options
- Email format validation

### API Endpoints

- `GET /api/leads` - List all leads with optional filters
- `GET /api/leads/{id}` - Get a specific lead
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/{id}` - Update a lead
- `DELETE /api/leads/{id}` - Delete a lead
- `POST /api/leads/{id}/enrich` - Enrich lead data

## 🏗️ Architecture Principles

### Atomic Architecture

**Backend (API):**

1. **Models**: Pure data structures (SQLAlchemy)
2. **Schemas**: Input/output validation (Pydantic)
3. **Repositories**: Direct database operations only (no business logic)
4. **Services**: Business logic layer (calls repositories)
5. **Routes**: HTTP handlers (calls services, returns responses)

**Frontend (Web):**

1. **Components**: Presentational only (props in, UI out) - kebab-case naming
2. **Hooks**: Stateful logic and side effects - kebab-case naming
3. **Services**: API communication layer - kebab-case naming
4. **Pages**: Route-level components (compose components) - kebab-case naming
5. **Types**: TypeScript interfaces and types - kebab-case naming

## 🔧 Development

### Backend Development

```bash
cd api
uv run python
```

### Frontend Development

```bash
cd web
npm run dev
```

### Linting & Formatting

Backend:

```bash
cd api
uv run ruff check .          # Check for code issues
uv run ruff format .          # Format code
uv run ruff check --fix .      # Auto-fix issues
```

Frontend:

```bash
cd web
npm run lint
```

## 📝 API Documentation

Once the backend is running, visit:

- Interactive API docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## 🧪 Testing

### Backend Tests

```bash
cd api
uv run pytest
```

### Frontend Tests

```bash
cd web
yarn test
```

## 🚢 Deployment

### Backend Deployment

1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy with Docker/Kubernetes
4. Set up reverse proxy (Nginx)

### Frontend Deployment

1. Build the application: `yarn build`
2. Deploy to Vercel, Netlify, or any static hosting

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
