from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SpectroscopyRequest(BaseModel):
    query: str

@router.post("/spectroscopy")
async def spectroscopy_route(request: SpectroscopyRequest):
    molecule = request.query.strip().split()[-1].capitalize()

    return {
        "uv": {
            "peaks": [
                {
                    "wavelength": 270,
                    "intensity": "strong",
                    "type": "π→π*"
                }
            ]
        },
        "ir": {
            "peaks": [
                {
                    "wavenumber": 3300,
                    "intensity": "broad",
                    "assignment": "O–H stretch"
                },
                {
                    "wavenumber": 1600,
                    "intensity": "strong",
                    "assignment": "C=C aromatic stretch"
                },
                {
                    "wavenumber": 1250,
                    "intensity": "medium",
                    "assignment": "C–O stretch"
                }
            ]
        },
        "explanation": f"""
Phenol is an aromatic compound with a hydroxyl group.

🧪 **UV Spectrum**
- A strong absorption around **270 nm** corresponds to a π→π* transition in the aromatic ring.

🔬 **IR Spectrum**
- **O–H Stretch** appears as a broad band near **3300 cm⁻¹**
- **C=C Aromatic Stretches** near **1600 cm⁻¹**
- **C–O Stretch** shows up around **1250 cm⁻¹**

These features confirm the presence of both the aromatic ring and hydroxyl functional group.
"""
    }
