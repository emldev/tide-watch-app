import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Get DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Configure Engine based on URL existence
if DATABASE_URL:
    # Fix for Render/Heroku using old postgres:// style
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # Postgres engine (no special args needed)
    engine = create_engine(DATABASE_URL)
else:
    # 3. Local Fallback to SQLite
    SQLALCHEMY_DATABASE_URL = "sqlite:///./tides.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
