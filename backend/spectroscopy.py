from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SpectroscopyRequest(BaseModel):
    query: str

@router.post("/spectroscopy")
async def spectroscopy_route(request: SpectroscopyRequest):
    molecule = request.query.strip().split()[-1].capitalize()

    mock_answer = f"""
### 1. UV Spectrum of {molecule}

- **λmax:** ~270 nm (π→π* transition)
- **Notes:** Conjugated aromatic systems absorb in UV range.

### 2. IR Spectrum of {molecule}

- **O-H Stretch:** ~3300 cm⁻¹  
- **C=C Aromatic:** ~1600 cm⁻¹  
- **Fingerprint Region:** 600–1500 cm⁻¹

These are estimated values for illustration.
"""

    return { "answer": mock_answer }
