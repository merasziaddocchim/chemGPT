from fastapi import APIRouter, HTTPException, Depends, status, Request
from sqlalchemy.orm import Session
from . import models, schemas, utils
from .database import SessionLocal
import uuid
import re

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def password_complexity(password: str) -> bool:
    # At least 8 chars, 1 upper, 1 lower, 1 digit, 1 special char
    if (len(password) < 8 or
        not re.search(r'[A-Z]', password) or
        not re.search(r'[a-z]', password) or
        not re.search(r'[0-9]', password) or
        not re.search(r'[\W_]', password)):
        return False
    return True

@router.post("/register", response_model=schemas.ShowUser)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if not user.accept_terms:
        raise HTTPException(status_code=400, detail="You must accept Terms and Privacy Policy.")
    if not password_complexity(user.password):
        raise HTTPException(
            status_code=400, 
            detail="Password must be at least 8 characters and include upper, lower, digit, special character."
        )
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed_password = utils.hash_password(user.password)
    token = str(uuid.uuid4())
    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        is_verified=False,
        verification_token=token
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    sent = utils.send_verification_email(user.email, token)
    if not sent:
        raise HTTPException(status_code=500, detail="Could not send verification email.")
    return db_user

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not utils.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials.")
    if not db_user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified.")
    access_token = utils.create_access_token(data={"sub": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.verification_token == token).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid or expired verification token.")
    db_user.is_verified = True
    db_user.verification_token = None
    db.commit()
    return {"message": "Email verified. You can now log in."}
