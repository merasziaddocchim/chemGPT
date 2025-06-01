// frontend/utils/api.js

const API_BASE = "https://chemgpt-gateway-production.up.railway.app";

export async function extractEntities(text) {
  const res = await fetch(`${API_BASE}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Extract API error");
  return res.json();
}

export async function getSpectra(molecule) {
  const res = await fetch(`${API_BASE}/spectro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ molecule }),
  });
  if (!res.ok) throw new Error("Spectro API error");
  return res.json();
}

export async function getRetro(smiles) {
  const res = await fetch(`${API_BASE}/retro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ smiles }),
  });
  if (!res.ok) throw new Error("Retro API error");
  return res.json();
}
