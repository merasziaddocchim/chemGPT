from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    accept_terms: bool = Field(..., description="You must accept Terms of Service and Privacy Policy.")

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ShowUser(BaseModel):
    id: str
    email: EmailStr
    is_verified: bool

    class Config:
        orm_mode = True
