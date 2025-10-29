export const API_URL = "http://localhost:5000";

export async function ping() {
  const res = await fetch(`${API_URL}/api/ping`);
  return res.json();
}

export async function getRides() {
  const res = await fetch(`${API_URL}/api/rides`, { credentials: "include" });
  return res.json();
}

export async function postRide(payload) {
  const res = await fetch(`${API_URL}/api/rides`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
}
