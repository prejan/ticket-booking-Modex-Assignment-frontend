const BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

export async function fetchJSON(path: string, opts: RequestInit = {}) {
  const url = `${BASE}/api${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {})
  };

  let body = opts.body;

  // Convert JSON object → string
  if (body && typeof body !== "string") {
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...opts,
    headers,
    body
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || response.statusText);
  }

  return data;
}
