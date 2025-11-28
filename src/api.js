export const API_URL = "http://localhost:5001";

export async function ping()
{
  const res = await fetch(`${API_URL}/api/ping`);
  return res.json();
}

export async function getGreengoRides()
{
  const res = await fetch(`${API_URL}/api/greengo/rides`, {
    credentials: "include",
  });
  return res.json();
}

export async function postGreengoRide(payload)
{
  const res = await fetch(`${API_URL}/api/greengo/rides`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function signup(email, password)
{
  const res = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function login(email, password)
{
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function scheduleRide({ email, pickup, dropoff, datetime })
{
  const res = await fetch(`${API_URL}/api/ride`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pickup, dropoff, datetime }),
  });
  return res.json();
}

export async function getUserRides(email)
{
  const res = await fetch(`${API_URL}/api/rides?email=${encodeURIComponent(email)}`);
  return res.json();
}

export async function findMatchingRides(pickup, dropoff)
{
  const url = `${API_URL}/api/match?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`;
  const res = await fetch(url);
  return res.json();
}

export async function cancelRide(id)
{
  const res = await fetch(`${API_URL}/api/ride/${id}`,
  {
    method: "DELETE",
  });
  return res.json();
}
