const BASE = process.env.REACT_APP_API_URL || "ticket-booking-modex-assignment-production.up.railway.app:3000";

export async function fetchJSON(path: string, opts: RequestInit = {}) {
  const url = `${BASE}/api${path}`;

  // Always ensure headers exist
  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {})
  };

  let body = opts.body;

  // Convert body object → JSON string
  if (body && typeof body !== "string") {
    body = JSON.stringify(body);
  }

  const res = await fetch(url, {
    ...opts,
    headers,
    body
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || res.statusText);
  }

  return data;
}
