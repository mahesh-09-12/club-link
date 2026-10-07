# ClubLink Backend API

FastAPI backend API for **ClubLink - College Club Management System**.

## Project Architecture

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI application instance & health endpoints
│   ├── database.py       # SQLAlchemy engine, session maker, & get_db dependency
│   ├── auth/
│   │   ├── __init__.py
│   │   └── security.py   # Password hashing (bcrypt) & JWT token handling
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py       # SQLAlchemy User model (student, club_coordinator, faculty_coordinator)
│   ├── routes/
│   │   ├── __init__.py
│   │   └── auth.py       # Auth endpoints (/register, /login, /me)
│   └── schemas/
│       ├── __init__.py
│       └── auth.py       # Pydantic request/response validation schemas
├── .env.example          # Environment variables template
├── requirements.txt      # Python dependencies
└── README.md
```

## Setup & Running Instructions

### 1. Create a Python Virtual Environment
Navigate to the `backend/` directory:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:
- **Windows (PowerShell):** `.\.venv\Scripts\Activate.ps1`
- **Linux/macOS:** `source .venv/bin/activate`

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set environment variables in `.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/clublink_db
JWT_SECRET_KEY=dev-secret-key-change-in-production-1234567890
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Start the FastAPI Server
```bash
uvicorn app.main:app --reload
```

The API server will run at `http://127.0.0.1:8000`.

---

## Authentication Endpoints

### 1. User Registration
`POST /api/auth/register`

**Request Body:**
```json
{
  "full_name": "Jane Student",
  "email": "jane@university.edu",
  "password": "securepassword123",
  "role": "student"
}
```

*Allowed roles:* `student`, `club_coordinator`, `faculty_coordinator`

**Response (`201 Created`):**
```json
{
  "id": 1,
  "full_name": "Jane Student",
  "email": "jane@university.edu",
  "role": "student",
  "created_at": "2026-10-07T07:30:00Z"
}
```

---

### 2. User Login
`POST /api/auth/login`

**Request Body:**
```json
{
  "email": "jane@university.edu",
  "password": "securepassword123"
}
```

**Response (`200 OK`):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "full_name": "Jane Student",
    "email": "jane@university.edu",
    "role": "student",
    "created_at": "2026-10-07T07:30:00Z"
  }
}
```

---

### 3. Current User Profile (Protected)
`GET /api/auth/me`

**Header Required:** `Authorization: Bearer <access_token>`

**Response (`200 OK`):**
```json
{
  "id": 1,
  "full_name": "Jane Student",
  "email": "jane@university.edu",
  "role": "student",
  "created_at": "2026-10-07T07:30:00Z"
}
```
