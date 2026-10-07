from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import engine, Base, get_db
# Import models to ensure they are registered with Base.metadata before create_all
from app.models.user import User
from app.models.club import Club
from app.models.join_request import JoinRequest
from app.routes.auth import router as auth_router
from app.routes.clubs import router as clubs_router
from app.routes.join_requests import router as join_requests_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager for startup & shutdown tasks."""
    try:
        # Create database tables if database is reachable
        Base.metadata.create_all(bind=engine)
        print("Database tables initialized successfully.")
    except Exception as e:
        print(f"Database initialization deferred (PostgreSQL not reachable at startup): {e}")
    yield


app = FastAPI(
    title="ClubLink API",
    description="Backend API for College Club Management System",
    version="0.3.1",
    lifespan=lifespan
)

# Include Routers
app.include_router(auth_router)
app.include_router(clubs_router)
app.include_router(join_requests_router)


@app.get("/api/health", status_code=status.HTTP_200_OK)
def health_check() -> dict[str, str]:
    """Health check endpoint to verify that the FastAPI server is running."""
    return {"status": "ok"}


@app.get("/api/health/db", status_code=status.HTTP_200_OK)
def db_health_check(db: Session = Depends(get_db)) -> dict[str, str]:
    """Database connectivity health check endpoint."""
    try:
        result = db.execute(text("SELECT 1"))
        result.scalar()
        return {
            "status": "ok",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connection failed: {str(e)}"
        )
